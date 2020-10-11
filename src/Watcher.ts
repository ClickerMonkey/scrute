
import { Node } from './Node'
import { Link } from './Link'



/**
 * An array of watcher functions which are currently executing.
 */
export const liveWatchers: Watcher[] = [];

/**
 * The loose definition for a watched function. It could return a value, or
 * nothing. Any returned value is stored in the Watcher in the result property.
 */
export type WatchExpression = (watcher: Watcher) => any;


/**
 * A class which holds a user supplied function and list of observed
 * depdendencies it references. When any of those dependencies change a watcher
 * is notified.
 */
export class Watcher
{

  public expression: WatchExpression;
  public result: any;
  public onResult: WatchExpression;
  public dirty: boolean;
  public immediate: boolean;
  public deep: boolean;
  public links: Node<Link>;
  public paused: boolean;
  public evaluating: boolean;

  /**
   * Creates a new Watcher given an expression, if it's immediate, and if the
   * watches are deep.
   */
  public constructor (expression: WatchExpression, immediate: boolean = true, deep: boolean = false, onResult?: WatchExpression)
  {
    this.expression = expression;
    this.immediate = immediate;
    this.deep = deep;
    this.onResult = onResult;
    this.dirty = false;
    this.paused = false;
    this.evaluating = false;
    this.links = Node.head();
  }

  /**
   * Determines whether the watch function is currently observing anything for
   * changes.
   */
  public isWatching (): boolean
  {
    return !this.links.isEmpty();
  }

  /**
   * Notifies the watcher that a dependency has changed.
   */
  public notify (): void
  {
    if (this.evaluating)
    {
      return;
    }

    this.dirty = true;

    if (this.immediate)
    {
      this.update();
    }
  }

  /**
   * Executes the function and gathers a new list of dependencies.
   */
  public update (): void
  {
    this.evaluating = true;

    this.off();

    liveWatchers.push(this);

    try
    {
      this.result = this.expression(this);
    }
    finally
    {
      liveWatchers.pop();

      this.dirty = false;

      if (this.onResult)
      {
        try
        {
          this.onResult(this);
        }
        finally
        {
          this.evaluating = false;
        }
      }

      this.evaluating = false;
    }
  }

  /**
   * Stops watching for changes.
   */
  public off (): void
  {
    this.links.forEach(link => link.remove());
  }

  /**
   * Stops watching for changes and marks the watcher as paused.
   */
  public pause (): void
  {
    if (!this.paused)
    {
      this.off();
      this.paused = true;
    }
  }

  /**
   * Resumes watching for changes if the watcher was paused.
   */
  public resume (): void
  {
    if (this.paused)
    {
      this.update();
      this.paused = false;
    }
  }

}