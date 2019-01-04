
import { Watcher, WatchExpression } from './Watcher';
import { watch } from './watch';



/**
 * Adds or overrides the given property on the given object so when the property
 * is read a watched expression is ran whch generates and returns a value. If
 * no dependent variables have changed, then a cached is returned.
 *
 * @param target The object to add a proeprty to.
 * @param prop The name of the property to add.
 * @param expr The watched function which should return a value.
 * @returns A new instance of Watcher.
 */
export function computed (target: any, prop: PropertyKey, expr: WatchExpression): Watcher
{
  const watcher: Watcher = watch( expr, { immediate: false, deep: false } );

  watcher.dirty = true;

  Object.defineProperty( target, prop, {
    configurable: false,
    enumerable: true,
    get () {
      if (watcher.dirty) {
        watcher.update();
      }
      return watcher.result;
    }
  });

  return watcher;
}