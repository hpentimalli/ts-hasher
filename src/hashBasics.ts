import { Hasher } from './hasher';

export const hashString = (value: string): number => {
  let h = 0xdeadbeef;
  for (let i = 0; i < value.length; i += 1) {
    h = Math.imul(h ^ value.charCodeAt(i), 2654435761);
  }
  return (h ^ h >>> 16) >>> 0;
};

export const NULL_HASH = 104753242;
export const UNDEFININED_HASH = 897685908;
export const NAN_HASH = 2257481920;

export const hashBoolean: Hasher<boolean> = value => value ? 1 : 0;

export const hashNumber: Hasher<number> = value => isNaN(value)
  ? NAN_HASH
  : Number.isInteger(value) && value <= 0xFFFFFFFF && value >= -0xFFFFFFFF
    ? value
    : hashString(`__${value.toString()}__`);

export const hashDate: Hasher<Date> = value => hashNumber(value.getTime());

export const hashNullable = <T>(hasher: Hasher<T>) => (value: T | null): number => value === null
  ? NULL_HASH
  : hasher(value);

export const hashOptional = <T>(hasher: Hasher<T>) => (value: T | undefined): number => value === undefined
  ? UNDEFININED_HASH
  : hasher(value);

export const hashNullish = <T>(hasher: Hasher<T>) => (value: T | null | undefined): number => value === undefined
  ? UNDEFININED_HASH
  : value === null
    ? NULL_HASH
    : hasher(value);
