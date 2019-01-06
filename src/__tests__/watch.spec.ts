// import { describe, it, expect } from 'jest';

import { watch, observe, unobserve } from '../index'

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

  it('unobserve', () =>
  {
    let a = observe({
      x: 34,
      y: { z: 56 },
      h: () => {}
    });

    let w = watch(() => a.x + a.y.z);

    a.x = 12;

    expect(w.result).toBe(68);

    a.y.z = 10;

    expect(w.result).toBe(22);

    unobserve( a, true, false );

    a.y.z = 20;

    expect(w.result).toBe(22);
  })

  it('unobserve destroy', () =>
  {
    let a = observe({
      x: 34,
      y: { z: 56 },
      h: () => {}
    });

    let w = watch(() => a.x + a.y.z);

    a.x = 12;

    expect(w.result).toBe(68);

    a.y.z = 10;

    expect(w.result).toBe(22);

    unobserve( a, true, true );

    expect(() => {

      a.y.z = 20;

    }).toThrow();
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

  it('deep', () =>
  {
    let a = <any>observe({
      version: {
        major: 0,
        minor: 1,
        patch: 0
      }
    });

    let w = watch(() => JSON.stringify(a.version), {deep: true});
    let times: number = 0;

    w.onResult = () => times++;

    expect(w.result).toBe('{"major":0,"minor":1,"patch":0}');
    expect(times).toBe(0);

    a.version.major = 1;

    expect(w.result).toBe('{"major":1,"minor":1,"patch":0}');
    expect(times).toBe(2);

    a.version.newprop = 'hello';

    expect(w.result).toBe('{"major":1,"minor":1,"patch":0,"newprop":"hello"}');
    expect(times).toBe(3);
  })

  it('cyclical', () =>
  {
    let a = <any>observe({
      x: 1, y: 2, children: [
        {x: 3, y: 4, children: []},
        {x: 5, y: 6, children: [
          {x: 7, y: 8, children: []}
        ]}
      ]
    });

    let w = watch(() => a.children.reduce(
      (accum: number, curr: any) => accum + curr.x,
      0
    ));

    expect(w.result).toBe(8);

    a.children.push(a);

    expect(w.result).toBe(9);
  })

  it('deep json', () =>
  {
    let data = observe({
      input: 'Hello World'
    });

    let w0 = watch( () => JSON.stringify(data), { deep: true } );
    let w1 = watch( () => data.input );

    expect(w0.result).toBe('{"input":"Hello World"}');
    expect(w1.result).toBe('Hello World');

    data['input'] = 'Changed!';

    expect(w0.result).toBe('{"input":"Changed!"}');
    expect(w1.result).toBe('Changed!');

    data.input = 'Changed Again';

    expect(w0.result).toBe('{"input":"Changed Again"}');
    expect(w1.result).toBe('Changed Again');
  })

  function asc (a: number, b: number): number
  {
    return a - b;
  }

})
