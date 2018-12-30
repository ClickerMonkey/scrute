
import { PROPERTY, ARRAY_CHANGES, ARRAY_ITERATIONS } from './Constants';
import { Dependency } from './Dependency';
import { Observer } from './Observer';
import { Link } from './Link';
import { liveWatchers } from './Watcher';
import { observe, isObservable, isObserved } from './observe';




export const handler = {

  get (target: any, prop: PropertyKey, _reciever: any)
  {
    let val: any = target[ prop ];

    if (prop === PROPERTY)
    {
      return val;
    }

    const obs: Observer = target[ PROPERTY ] as Observer;

    if (typeof val === 'function')
    {
      if (target instanceof Array)
      {
        if (prop in ARRAY_CHANGES)
        {
          return handleArrayChange( target, val, obs );
        }

        if (prop in ARRAY_ITERATIONS)
        {
          return handleArrayIteration( target, val, obs );
        }
      }

      return val;
    }

    return handleWatching( target, prop, val, obs );
  },

  set (target: any, prop: PropertyKey, value: any, _reciever: any): boolean
  {
    if (value !== target[ prop ])
    {
      target[prop] = value;

      const obs: Observer = target[ PROPERTY ] as Observer;

      obs.notify( prop );
    }

    return true;
  },

  deleteProperty (target: any, prop: PropertyKey): boolean
  {
    const obs: Observer = target[ PROPERTY ] as Observer;

    obs.destroy( prop );

    return true;
  }

};



function handleWatching (target: any, prop: PropertyKey, val: any, obs: Observer): any
{
  const dep: Dependency = obs.dep( prop );

  liveWatchers.forEach( watcher => Link.create( watcher, dep ) );

  if (isObservable( val ) && !isObserved( val ))
  {
    target[ prop ] = val = observe( val, { parent: dep } );
  }

  return val;
}

function handleArrayIteration (target: any[], val: Function, obs: Observer): () => any
{
  return function()
  {
    const length: number = target.length;

    for (let i = 0; i < length; i++)
    {
      handleWatching( target, i, target[ i ], obs );
    }

    handleWatching( target, 'length', target.length, obs );

    return val.apply( target, arguments );
  };
}

function handleArrayChange (target: any, val: Function, obs: Observer): () => any
{
  return function ()
  {
    const copy = target.slice();
    const result = val.apply( target, arguments );
    const max: number = Math.max( copy.length, target.length );

    for (let i = 0; i < max; i++)
    {
      if (copy[i] !== target[i])
      {
        obs.notify( i );
      }

      if (i >= target.length)
      {
        obs.destroy( i );
      }
    }

    if (target.length !== copy.length)
    {
      obs.notify( 'length' );
    }

    return result;
  };
}