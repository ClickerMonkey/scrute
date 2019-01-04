
import { PROPERTY, ARRAY_CHANGES, ARRAY_ITERATIONS } from './Constants';
import { Dependency } from './Dependency';
import { Observer } from './Observer';
import { Link } from './Link';
import { liveWatchers } from './Watcher';
import { observe, isObservable, isObserved } from './observe';



/**
 * The handler to pass to the Proxy constructor.
 */
export const handler =
{

  /**
   * Intercepts the property getting so any watch functions can gather its list
   * of dependencies.
   */
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

  /**
   * Intercepts the property setting so all dependent watchers are notified,
   */
  set (target: any, prop: PropertyKey, value: any, _reciever: any): boolean
  {
    if (value !== target[ prop ])
    {
      target[prop] = value;

      const obs: Observer = target[ PROPERTY ] as Observer;

      obs.notify( prop, true );
    }

    return true;
  },

  /**
   * Intercepts the property delete operator so all dependent watchers no longer
   * listen to changes.
   */
  deleteProperty (target: any, prop: PropertyKey): boolean
  {
    const obs: Observer = target[ PROPERTY ] as Observer;

    obs.remove( prop );

    return true;
  }

};


/**
 * If a property on an object contains an observable object/array which is not
 * yet being observered - it is replaced with a proxy. The value of the property
 * is returned.
 */
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

/**
 * Returns a function which ensures when its called that all items and the
 * length of the array is watched by any live watchers.
 */
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

/**
 * Returns a function which notifies any watched functions of changes after a
 * mutating array operation is executed.
 */
function handleArrayChange (target: any[], val: Function, obs: Observer): () => any
{
  return function ()
  {
    const copy = target.slice();
    const result = val.apply( target, arguments );
    const max: number = Math.max( copy.length, target.length );
    let deepNotified: boolean = false;

    for (let i = 0; i < max; i++)
    {
      if (copy[i] !== target[i])
      {
        deepNotified = deepNotified || obs.notify( i );
      }

      if (i >= target.length)
      {
        obs.remove( i );
      }
    }

    if (target.length !== copy.length)
    {
      deepNotified = deepNotified || obs.notify( 'length' );
    }

    if (deepNotified && obs.parent)
    {
      obs.parent.notify( true );
    }

    return result;
  };
}