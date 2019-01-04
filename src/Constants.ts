
/**
 * The hidden property which stores the reference to the Observer for an object.
 */
export const PROPERTY = '$obs';

/**
 * This is a map of array functions which modify the contents of an array. When
 * this happens the observed array is checked for referential and length changes.
 */
export const ARRAY_CHANGES = {
  'pop': 1,
  'push': 1,
  'shift': 1,
  'unshift': 1,
  'reverse': 1,
  'splice': 1,
  'sort': 1,
};

/**
 * This is a map of array functions which can return different results when the
 * array is modified with the above functions. When these functions are called
 * the watch function observes all items in the array and it's length.
 */
export const ARRAY_ITERATIONS = {
  'concat': 1,
  'every': 1,
  'fill': 1,
  'filter': 1,
  'find': 1,
  'findIndex': 1,
  'forEach': 1,
  'includes': 1,
  'indexOf': 1,
  'join': 1,
  'lastIndexOf': 1,
  'map': 1,
  'reduce': 1,
  'reduceRight': 1,
  'slice': 1,
  'some': 1,
};