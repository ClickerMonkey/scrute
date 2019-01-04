
import { Link } from './Link';
import { Node } from './Node';
import { Observer } from './Observer';



/**
 * A map of dependencies keyed by the property name.
 */
export type DependencyMap = { [prop: string]: Dependency };


/**
 * A dependency is a property of an object or an item in an array.
 */
export class Dependency
{

  public links: Node<Link>;
  public observer: Observer;

  /**
   * Creates a new Dependency.
   *
   * @param observer The observer for the object.
   */
  public constructor (observer: Observer)
  {
    this.observer = observer;
    this.links = Node.head();
  }

  /**
   * Notifies all observing watchers that this dependency has changed. If any
   * of the watchers are watching for deep (sub) changes the parent dependency
   * is notified.
   *
   * @param notifyParent If a deep watcher is listening on this dependency,
   *    should we notify the parent of the observer?
   * @returns True if a deep watcher was notified.
   */
  public notify (notifyParent: boolean = false): boolean
  {
    let deep: boolean = false;

    this.links.forEach(link =>
    {
      link.watcher.notify()

      deep = deep || link.watcher.deep;
    });

    if (notifyParent && deep && this.observer.parent)
    {
      this.observer.parent.notify( notifyParent );
    }

    return deep;
  }

  /**
   * Destroys the depdendency removing it from all watchers.
   */
  public destroy (): void
  {
    this.links.forEach(link => link.remove());
  }

}