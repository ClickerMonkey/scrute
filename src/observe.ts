
import { PROPERTY } from './Constants';
import { Observer } from './Observer';
import { Dependency } from './Dependency';
import { handler } from './handler';


/**
 * Options that can be passed to the observe function.
 */
export interface ObserveOptions
{
  parent?: Dependency;
}

/**
 * Observes the object/array if is not yet observed. An observed object is one
 * that can be used in watch functions and will trigger then when referenced
 * values in the observed object changes.
 *
 * @param input The object/array to observe for changes.
 * @returns The reference to the object/array or the Proxy if it is observable
 *    and has not yet been observed.
 */
export function observe <T>(input: T, { parent = null }: ObserveOptions = {}): T
{
  if (isObservable(input))
  {
    if (!input[PROPERTY])
    {
      const proxy = Proxy.revocable( <any>input, handler );

      input = proxy.proxy as T;

      Object.defineProperty( input, PROPERTY, {
        value: new Observer( proxy.revoke, parent ),
        writable: false,
        configurable: true,
        enumerable: false
      });
    }
  }

  return input;
}

/**
 * Determines whether the given input can be observed.
 *
 * @param input The input to test.
 */
export function isObservable (input: any): boolean
{
  return !!(typeof input === 'object' && input !== null);
}

/**
 * Determines whether the given input is currently being observed.
 *
 * @param input The input to check for observation.
 */
export function isObserved (input: any): boolean
{
  return !!(typeof input === 'object' && input !== null && input[ PROPERTY ]);
}
