
import { PROPERTY } from './Constants';
import { Observer } from './Observer';
import { isObserved } from './observe';



/**
 * Stops all observations for the given variable. Optionally it can travel
 * through all descendant observers and unobserve them as well.
 *
 * @param input The possibly observed object.
 * @param deep If all descendant observers should be unobserved.
 * @param destroy If the proxy should be destroyed, making it unusable.
 * @returns The reference to the value passed to this function.
 */
export function unobserve <T>(input: T, deep: boolean = false, destroy: boolean = true): T
{
  if (isObserved( input ))
  {
    const obs: Observer = input[ PROPERTY ] as Observer;

    delete input[ PROPERTY ];

    obs.destroy( input, deep, destroy );
  }

  return input;
}

