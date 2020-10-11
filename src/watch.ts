
import { Watcher, WatchExpression } from './Watcher'



/**
 * Options which can be passed to the watch function.
 */
export interface WatchOptions
{
  /**
   * If the function should executed as soon as a dependent value changes
   * (true), or simply mark the returned Watcher instance as dirty (false).
   */
  immediate?: boolean;

  /**
   * If true, not only does the function execute when referenced values change,
   * but also nested values.
   */
  deep?: boolean;

  /**
   * A callback to invoke when the watched values change.
   */
  onResult?: WatchExpression;
}


/**
 * Given a function to execute, any observed objects/arrays which are referenced
 * in that function are tracked. If they change the given function will execute
 * again and a new list of dependencies is generated. A Watcher instance is
 * returned which can be used to pause, resume, or stop watching for changes.
 *
 * @param expr The function to execute when any referenced observed values change.
 * @param immediate If the function should executed as soon as a dependent value
 *    changes (true), or simply mark the returned Watcher instance as dirty (false).
 * @param deep If true, not only does the function execute when referenced
 *    values change, but also nested values.
 * @returns A new instance of Watcher.
 */
export function watch (expr: WatchExpression, { immediate = true, deep = false, onResult }: WatchOptions = {}): Watcher
{
  const watcher = new Watcher( expr, immediate, deep, onResult );

  watcher.update();

  return watcher;
}