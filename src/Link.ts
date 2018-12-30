
import { Node } from './Node';
import { Watcher } from './Watcher';
import { Dependency } from './Dependency';



export class Link
{

  public watcherNode: Node<Link>;
  public watcher: Watcher;

  public dependencyNode: Node<Link>;
  public dependency: Dependency;

  public constructor (watcher: Watcher, dependency: Dependency)
  {
    this.watcher = watcher;
    this.dependency = dependency;
    this.watcherNode = new Node( this );
    this.dependencyNode = new Node( this );
  }

  public remove (): void
  {
    this.watcherNode.remove();
    this.dependencyNode.remove();
  }

  public static create (watcher: Watcher, dependency: Dependency): void
  {
    let exists: boolean = false;

    dependency.links.forEach(link => exists = exists || link.watcher === watcher);

    if (!exists)
    {
      const link = new Link( watcher, dependency );

      dependency.links.push( link.dependencyNode );

      watcher.links.push( link.watcherNode );
    }
  }

}