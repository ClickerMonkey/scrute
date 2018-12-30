// import { describe, it, expect } from 'jest';

import { watch, observe } from '../index'

describe('watch', () => {

  it('object', () =>
  {
    let a = observe({
      x: 34,
      y: { z: 56 },
      h: () => {}
    });

    let w = watch(() => a.x + a.y.z);

    expect(w.result).toBe(90);

    a.x = 12;

    expect(w.result).toBe(68);

    a.y.z = 10;

    expect(w.result).toBe(22);

    w.off();

    a.x = 45;

    expect(w.result).toBe(22);
  })

  it('is not circular', () =>
  {
    let a = observe({
      x: 34,
      y: 10,
      result: 0
    });

    let w = watch(() => {
      a.result = a.x + a.y;
    });

    expect(a.result).toBe(44);

    a.x = 12;

    expect(a.result).toBe(22);

    a.y = 5;

    expect(a.result).toBe(17);

    w.off();

    a.x = 45;

    expect(a.result).toBe(17);
  })

  it('array push', () =>
  {
    let a = observe([
      34,
      'hello',
      { x: 34, y: 56 }
    ]);

    let w = watch(() => {
      let out = '';
      for (let i = 0; i < a.length; i++) {
        out += JSON.stringify(a[i]);
      }
      return out;
    });

    expect(w.result).toBe('34"hello"{"x":34,"y":56}');

    a.push(56);

    expect(w.result).toBe('34"hello"{"x":34,"y":56}56');

    w.off();

    a.push(78);

    expect(w.result).toBe('34"hello"{"x":34,"y":56}56');
  })

  it('array splice', () =>
  {
    let a = observe([
      34,
      'hello',
      { x: 34, y: 56 }
    ]);

    let w = watch(() => {
      let out = '';
      for (let i = 0; i < a.length; i++) {
        out += JSON.stringify(a[i]);
      }
      return out;
    });

    expect(w.result).toBe('34"hello"{"x":34,"y":56}');

    a.splice(2, 1);

    expect(w.result).toBe('34"hello"');

    w.off();

    a.push(78);

    expect(w.result).toBe('34"hello"');
  })

  it('array sort', () =>
  {
    let a = observe([ 34, 5, 89 ]);
    let w = watch(() => a.join(','));

    expect(w.result).toBe('34,5,89');

    a.sort( asc );

    expect(w.result).toBe('5,34,89');

    a.push(12);

    expect(w.result).toBe('5,34,89,12');

    a.sort( asc );

    expect(w.result).toBe('5,12,34,89');

    w.off();

    a.push(1);

    expect(w.result).toBe('5,12,34,89');
  })

  function asc (a: number, b: number): number
  {
    return a - b;
  }

})
