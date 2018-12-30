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

})
