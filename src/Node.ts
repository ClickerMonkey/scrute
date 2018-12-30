


export class Node<T>
{

  public next: Node<T>;
  public prev: Node<T>;
  public value: T;

  public constructor (value: T)
  {
    this.value = value;
    this.next = this.prev = this;
  }

  public forEach (iterator: (value: T, node: Node<T>, index: number) => any): number
  {
    let curr: Node<T> = this.next;
    let index: number = 0;

    while (curr !== this)
    {
      const next: Node<T> = curr.next;

      iterator( curr.value, curr, index );

      curr = next;
      index++;
    }

    return index;
  }

  public insertAfter (prev: Node<T>): void
  {
    this.next = prev.next;
    this.prev = prev;
    this.prev.next = this.next.prev = this;
  }

  public push (last: Node<T>): void
  {
    last.insertAfter(this.prev);
  }

  public remove (): void
  {
    if (!this.isEmpty())
    {
      this.next.prev = this.prev;
      this.prev.next = this.next;
      this.prev = this.next = this;
    }
  }

  public isEmpty (): boolean
  {
    return this.next === this;
  }

  public static head<T>(): Node<T>
  {
    return new Node(null);
  }

}