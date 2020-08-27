import {
  hashString,
  hashNumber,
  NULL_HASH,
  UNDEFININED_HASH,
  hashDate,
} from './hashBasics';

export const hashObject = <T extends { [key: string]: any }>(keys: Array<keyof T>) => (object: T): number => {
  let h = 0;

  for (let ix = 0; ix < keys.length; ix += 1) {
    const key = keys[ix];
    const value = object[key];

    if (typeof key !== 'string') {
      throw new Error('Only string keys are supported');
    }

    h ^= hashString(key);

    let valueHash: number;

    if (value === undefined) {
      valueHash = UNDEFININED_HASH;
    } else if (value === null) {
      valueHash = NULL_HASH;
    } else if (typeof value === 'string') {
      valueHash = hashString(value);
    } else if (typeof value === 'number') {
      valueHash = hashNumber(value);
    } else if (typeof value === 'boolean') {
      valueHash = value ? 1 : 0;
    } else if (value as any instanceof Date) {
      valueHash = hashDate(value);
    } else {
      throw new Error(`Type ${typeof value} is not supported for hashing`);
    }

    h ^= valueHash;
  }

  return h;
};
