

/**
 * A node in a doubly-linked list. The functions in this class are mostly
 * intended for use by the head node. A default head node points to itself and
 * has a null value. A node always has a next or previous node reference.
 */
export class Node<T>
{

  public next: Node<T>;
  public prev: Node<T>;
  public value: T;

  /**
   * Creates a new node given a value.
   *
   * @param value The value for the node.
   */
  public constructor (value: T)
  {
    this.value = value;
    this.next = this.prev = this;
  }

  /**
   * Iterates over the nodes in the linked list and returns the number of nodes
   * in the list.
   *
   * @param iterator The function to call with the value of the node, the
   *    reference to the node (useful for removing the value from the list),
   *    and the index of the value in the list starting at the next node.
   */
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

  /**
   * Inserts this Node after the given node.
   *
   * @param prev The node to insert this Node after.
   */
  public insertAfter (prev: Node<T>): void
  {
    this.next = prev.next;
    this.prev = prev;
    this.prev.next = this.next.prev = this;
  }

  /**
   * If this is the head of a list, this function adds a node to the very end
   * of the list. This is also equivalent to adding the given node directly
   * before this node.
   *
   * @param last The node to insert at the end of the list / before this node.
   */
  public push (last: Node<T>): void
  {
    last.insertAfter(this.prev);
  }

  /**
   * If this Node is in a list, it removes itself from the list.
   */
  public remove (): void
  {
    if (!this.isEmpty())
    {
      this.next.prev = this.prev;
      this.prev.next = this.next;
      this.prev = this.next = this;
    }
  }

  /**
   * Returns whether the list this node is in is empty.
   */
  public isEmpty (): boolean
  {
    return this.next === this;
  }

  /**
   * Returns a new node for the head of the list.
   */
  public static head<T>(): Node<T>
  {
    return new Node(null);
  }

}