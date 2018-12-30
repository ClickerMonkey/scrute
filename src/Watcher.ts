
import { Node } from './Node'
import { Link } from './Link'



export const liveWatchers: Watcher[] = [];

export type WatchExpression = () => any;

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

  public constructor (expression: WatchExpression, immediate: boolean = true, deep: boolean = false)
  {
    this.expression = expression;
    this.immediate = immediate;
    this.deep = deep;
    this.dirty = false;
    this.paused = false;
    this.evaluating = false;
    this.links = Node.head();
  }

  public isWatching (): boolean
  {
    return !this.links.isEmpty();
  }

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

  public update (): void
  {
    this.evaluating = true;

    this.off();

    liveWatchers.push(this);

    try
    {
      this.result = this.expression();
    }
    finally
    {
      liveWatchers.pop();

      this.dirty = false;

      if (this.onResult)
      {
        try
        {
          this.onResult();
        }
        finally
        {
          this.evaluating = false;
        }
      }

      this.evaluating = false;
    }
  }

  public off (): void
  {
    this.links.forEach(link => link.remove());
  }

  public pause (): void
  {
    if (!this.paused)
    {
      this.off();
      this.paused = true;
    }
  }

  public resume (): void
  {
    if (this.paused)
    {
      this.update();
      this.paused = false;
    }
  }

}