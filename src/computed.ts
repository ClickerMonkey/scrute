
import { Watcher, WatchExpression } from './Watcher';
import { watch } from './watch';



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