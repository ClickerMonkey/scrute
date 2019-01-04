
import { Node } from './Node';
import { Watcher } from './Watcher';
import { Dependency } from './Dependency';



/**
 * A relationship between a Watcher and Dependency which stores both links so
 * the lists stored in the watcher and dependency can both be removed from
 * instantly.
 */
export class Link
{

  public watcherNode: Node<Link>;
  public watcher: Watcher;

  public dependencyNode: Node<Link>;
  public dependency: Dependency;

  /**
   * Creates a new Link given the Watcher and Dependency.
   */
  public constructor (watcher: Watcher, dependency: Dependency)
  {
    this.watcher = watcher;
    this.dependency = dependency;
    this.watcherNode = new Node( this );
    this.dependencyNode = new Node( this );
  }

  /**
   * Removes the relationship between the Watcher and Dependency.
   */
  public remove (): void
  {
    this.watcherNode.remove();
    this.dependencyNode.remove();
  }

  /**
   * Creates a link between the given Watcher and Dependency. If a link already
   * exists, then this function has no effect. If a link does not exist, one is
   * created and added to both the dependency and watcher lists. A link
   * reference is always returned.
   */
  public static create (watcher: Watcher, dependency: Dependency): Link
  {
    let existing: Link = null;

    dependency.links.forEach(link => existing = (link.watcher === watcher ? link : existing));

    if (!existing)
    {
      existing = new Link( watcher, dependency );

      dependency.links.push( existing.dependencyNode );

      watcher.links.push( existing.watcherNode );
    }

    return existing;
  }

}