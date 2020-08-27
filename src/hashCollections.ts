import { Hasher } from './hasher';
import { hashString } from './hashBasics';

/**
 * Returns a function that Hashes a set of elements of type T. Order of elements is not
 * relevant
 * @param hasher the type T hasher
 */
export const hashSet = <T>(hasher: Hasher<T>) => (input: Iterable<T>): number => {
  let h = 0;
  for (const element of input) {
    h ^= hasher(element);
  }
  return h;
};


/**
 * Returns a function that Hashes a list of elements of type T. Order of elements is relevant
 * @param hasher the type T hasher
 */
export const hashList = <T>(hasher: Hasher<T>) => (input: Iterable<T>): number => {
  let h = 0;
  let ix = 0;
  for (const element of input) {
    h ^= hashString(`${ix}:${hasher(element)}`);
    ix += 1;
  }
  return h;
};
