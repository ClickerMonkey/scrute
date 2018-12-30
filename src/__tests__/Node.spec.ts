// import { describe, it, expect } from 'jest';

import { Node } from '../index'

describe('Node', () => {

  function toArray<T> (head: Node<T>): T[] {
    const arr: T[] = [];
    head.forEach(v => arr.push(v));
    return arr;
  }

  it('pushes', () =>
  {
    let head: Node<string> = Node.head();
    let a = new Node('a');
    let b = new Node('b');
    let c = new Node('c');

    head.push(a);
    head.push(b);
    head.push(c);

    expect(toArray(head)).toEqual(['a', 'b', 'c']);
  })

  it('removes middle', () =>
  {
    let head: Node<string> = Node.head();
    let a = new Node('a');
    let b = new Node('b');
    let c = new Node('c');

    head.push(a);
    head.push(b);
    head.push(c);

    expect(toArray(head)).toEqual(['a', 'b', 'c']);

    b.remove();

    expect(toArray(head)).toEqual(['a', 'c']);

    b.remove();

    expect(toArray(head)).toEqual(['a', 'c']);
  })

  it('removes first', () =>
  {
    let head: Node<string> = Node.head();
    let a = new Node('a');
    let b = new Node('b');
    let c = new Node('c');

    head.push(a);
    head.push(b);
    head.push(c);

    expect(toArray(head)).toEqual(['a', 'b', 'c']);

    a.remove();

    expect(toArray(head)).toEqual(['b', 'c']);

    a.remove();

    expect(toArray(head)).toEqual(['b', 'c']);
  })

  it('removes last', () =>
  {
    let head: Node<string> = Node.head();
    let a = new Node('a');
    let b = new Node('b');
    let c = new Node('c');

    head.push(a);
    head.push(b);
    head.push(c);

    expect(toArray(head)).toEqual(['a', 'b', 'c']);

    c.remove();

    expect(toArray(head)).toEqual(['a', 'b']);

    c.remove();

    expect(toArray(head)).toEqual(['a', 'b']);
  })

  it('removes all', () =>
  {
    let head: Node<string> = Node.head();
    let a = new Node('a');
    let b = new Node('b');
    let c = new Node('c');

    head.push(a);
    head.push(b);
    head.push(c);

    expect(toArray(head)).toEqual(['a', 'b', 'c']);

    c.remove();

    expect(toArray(head)).toEqual(['a', 'b']);

    a.remove();

    expect(toArray(head)).toEqual(['b']);

    b.remove();

    expect(toArray(head)).toEqual([]);
  })

  it('clear', () =>
  {
    let head: Node<string> = Node.head();
    let a = new Node('a');
    let b = new Node('b');
    let c = new Node('c');

    head.push(a);
    head.push(b);
    head.push(c);

    expect(toArray(head)).toEqual(['a', 'b', 'c']);

    head.remove();

    expect(toArray(head)).toEqual([]);
  })

})
