// import { describe, it, expect } from 'jest';

import { observe, computed } from '../index'

describe('watch', () => {

  it('object', () =>
  {
    let a = observe({
      x: 34,
      y: { z: 56 },
      h: () => {},
      result: 0
    });

    const w = computed( a, 'result', () => a.x + a.y.z );

    expect(a.result).toBe(90);

    a.x = 12;

    expect(a.result).toBe(68);

    a.y.z = 10;

    expect(a.result).toBe(22);

    w.off();

    a.x = 45;

    expect(a.result).toBe(22);
  })

  it('lazy', () =>
  {
    let a = <any>observe({
      name: 'scrute',
      version: {
        major: 0,
        minor: 0,
        patch: 1
      }
    });

    const w = computed( a, 'v', () =>
      a.version.major + '.' + a.version.minor + '.' + a.version.patch
    );

    let times = 0;

    w.onResult = () => times++;

    expect(times).toBe(0);

    expect(a.v).toBe('0.0.1');

    expect(times).toBe(1);

    expect(a.v).toBe('0.0.1');

    expect(times).toBe(1);

    a.version.minor = 2;

    expect(times).toBe(1);

    expect(a.v).toBe('0.2.1');

    expect(times).toBe(2);
  })

})
