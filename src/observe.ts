
import { PROPERTY } from './Constants';
import { Observer } from './Observer';
import { Dependency } from './Dependency';
import { handler } from './handler';



export interface ObserveOptions
{
  parent?: Dependency;
}

export function observe <T>(input: T, { parent = null }: ObserveOptions = {}): T
{
  if (isObservable(input))
  {
    if (!input[PROPERTY])
    {
      Object.defineProperty( input, PROPERTY, {
        value: new Observer( parent ),
        writable: false,
        configurable: false,
        enumerable: false
      });

      input = <unknown>new Proxy( <unknown>input as object, handler ) as T;
    }
  }

  return input;
}

export function isObservable (input: any): boolean
{
  return !!(typeof input === 'object' && input !== null);
}

export function isObserved (input: any): boolean
{
  return !!(typeof input === 'object' && input !== null && input[ PROPERTY ]);
}
