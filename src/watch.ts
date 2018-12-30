
import { Watcher } from './Watcher'



export interface WatchOptions
{
  immediate?: boolean;
  deep?: boolean;
}


export function watch (expr: () => any, { immediate = true, deep = false }: WatchOptions = {}): Watcher
{
  const watcher = new Watcher( expr, immediate, deep );

  watcher.update();

  return watcher;
}