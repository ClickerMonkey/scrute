
import { Dependency, DependencyMap } from './Dependency';


type Key = string | number;


export class Observer
{

  public parent: Dependency | null;
  public deps: DependencyMap;

  public constructor (parent: Dependency | null = null)
  {
    this.parent = parent;
    this.deps = {};
  }

  public dep (prop: PropertyKey): Dependency
  {
    let dep: Dependency = this.deps[ prop as Key ];

    if (!dep)
    {
      this.deps[ prop as Key ] = dep = new Dependency( this );
    }

    return dep;
  }

  public notify (prop: PropertyKey): void
  {
    const deps: DependencyMap = this.deps;

    if (prop in deps)
    {
      deps[ prop as Key ].notify();
    }
  }

  public destroy (prop: PropertyKey): void
  {
    const deps: DependencyMap = this.deps;

    if (prop in deps)
    {
      deps[ prop as Key ].destroy();

      delete deps[ prop as Key ];
    }
  }

}