
import { Link } from './Link';
import { Node } from './Node';
import { Observer } from './Observer';



export type DependencyMap = { [prop: string]: Dependency };


export class Dependency
{

  public links: Node<Link>;
  public observer: Observer;

  public constructor (observer: Observer)
  {
    this.observer = observer;
    this.links = Node.head();
  }

  public notify (): void
  {
    let deep: boolean = false;

    this.links.forEach(link =>
    {
      link.watcher.notify()

      deep = deep || link.watcher.deep;
    });

    if (deep && this.observer.parent)
    {
      this.observer.parent.notify();
    }
  }

  public destroy (): void
  {
    this.links.forEach(link => link.remove());
  }

}