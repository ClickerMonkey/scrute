
import { PROPERTY } from './Constants';
import { isObserved } from './observe';
import { Dependency, DependencyMap } from './Dependency';



type Key = string | number;


/**
 * An observer is for an object/array and keeps track of all watched properties.
 * If the observer belongs to a sub-object on an observed object then it has a
 * parent. This parent reference is needed for deeply watched objects.
 */
export class Observer
{

  public parent: Dependency | null;
  public deps: DependencyMap;
  public revoke: () => any;

  /**
   * Creates a new Observer.
   *
   * @param parent An optional parent dependency.
   */
  public constructor (revoke: () => any, parent: Dependency | null = null)
  {
    this.revoke = revoke;
    this.parent = parent;
    this.deps = Object.create(null);
  }

  /**
   * Returns a Dependency for the given property and creates it if it doesn't
   * exist already.
   *
   * @param prop The name of the property or the index of the array element.
   */
  public dep (prop: PropertyKey): Dependency
  {
    let dep: Dependency = this.deps[ prop as Key ];

    if (!dep)
    {
      this.deps[ prop as Key ] = dep = new Dependency( this );
    }

    return dep;
  }

  /**
   * If the given property or array element is being watched, all watchers will
   * be notified.
   *
   * @param prop The name of the property or the index of the array element to
   *    notify of changes.
   * @param notifyParent If a deep watcher is listening on this dependency,
   *    should we notify the parent of the observer?
   * @returns True if a deep watcher was notified.
   */
  public notify (prop: PropertyKey, notifyParent: boolean = false): boolean
  {
    const deps: DependencyMap = this.deps;

    if (prop in deps)
    {
      return deps[ prop as Key ].notify( notifyParent );
    }
    else if (notifyParent && this.parent)
    {
      this.parent.notify( notifyParent );
    }

    return false;
  }

  /**
   * Removes the given property or array element so it's no longer observed for
   * changes.
   *
   * @param prop The name of the property or the index of the array element to
   *    cease watching on.
   */
  public remove (prop: PropertyKey): void
  {
    const deps: DependencyMap = this.deps;

    if (prop in deps)
    {
      deps[ prop as Key ].destroy();

      delete deps[ prop as Key ];
    }
  }

  /**
   * Destroys this observer by destroying all dependents.
   *
   * @param target The object which holds this observer.
   * @param deep If any descendant objects should be destroyed as well.
   * @param revoke If the proxy should be revoked, making the object unusable.
   */
  public destroy (target: any, deep: boolean = false, revoke: boolean = true): void
  {
    const deps: DependencyMap = this.deps;

    for (let prop in deps)
    {
      deps[ prop ].destroy();

      delete deps[ prop ];

      if (deep)
      {
        const value: any = target[ prop ];

        if (isObserved( value ))
        {
          const obs = value[ PROPERTY ] as Observer;

          obs.destroy( value, deep, revoke );
        }
      }
    }

    if (revoke)
    {
      this.revoke();
    }
  }

}