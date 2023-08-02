import { deepCloneArray } from '../src/main.js';

describe('deepCloneArray', () => {
  it('should return an empty array when given an empty array', () => {
    const arr = [];
    const cloned = deepCloneArray(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr); // Ensure new array is not the same reference
  });

  it('should clone a simple array', () => {
    const arr = [1, 2, 3];
    const cloned = deepCloneArray(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr); // Ensure new array is not the same reference
  });

  it('should clone an array with nested arrays', () => {
    const arr = [1, 2, [3, 4, [5, 6]]];
    const cloned = deepCloneArray(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[2]).not.toBe(arr[2]); // Ensure nested array is not the same reference
    expect(cloned[2][2]).not.toBe(arr[2][2]); // And so on...
  });

  it('should clone an array with objects', () => {
    const arr = [{ a: 1, b: 2 }, { c: 3, d: 4 }];
    const cloned = deepCloneArray(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]); // Ensure nested objects are not the same reference
    expect(cloned[1]).not.toBe(arr[1]);
  });

  it('should clone an array with complex objects', () => {
    const arr = [
      { a: 1, b: [2, 3], c: { d: 4 } },
      { e: 5, f: [6, { g: 7 }], h: { i: 8 } }
    ];
    const cloned = deepCloneArray(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(arr[0]); // Ensure nested objects are not the same reference
    expect(cloned[1]).not.toBe(arr[1]);
    expect(cloned[0].b).not.toBe(arr[0].b);
    expect(cloned[0].c).not.toBe(arr[0].c);
    expect(cloned[1].f).not.toBe(arr[1].f);
    expect(cloned[1].h).not.toBe(arr[1].h);
    expect(cloned[1].f[1]).not.toBe(arr[1].f[1]);
  });
});
