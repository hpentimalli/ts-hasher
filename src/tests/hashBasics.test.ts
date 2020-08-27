import { describe, it } from 'mocha';
import * as chai from 'chai';
import * as chaidt from 'chai-datetime';
import {
  hashString,
  hashBoolean,
  hashNumber,
  hashDate,
  NULL_HASH,
  hashNullable,
  hashOptional,
  UNDEFININED_HASH,
  hashNullish,
} from '../hashBasics';

chai.use(chaidt);
const expect = chai.expect;

describe('hashString', () => {
  const str = 'This is a random string';
  const str2 = 'This is a random string 2';

  it('can two different strings', () => {
    const hash1 = hashString(str);
    const hash2 = hashString(str2);
    expect(hash1).to.be.not.equal(hash2);
  });

  it('can produce the same hash', () => {
    const hash1 = hashString(str);
    const hash2 = hashString(str);
    expect(hash1).to.be.equal(hash2);
  });
});

describe('hashBoolean', () => {
  it('can two different booleans', () => {
    const hash1 = hashBoolean(true);
    const hash2 = hashBoolean(false);
    expect(hash1).to.be.not.equal(hash2);
  });

  it('can produce the same hash', () => {
    const hash1 = hashBoolean(true);
    const hash2 = hashBoolean(true);
    expect(hash1).to.be.equal(hash2);
  });
});

describe('hashNumber', () => {
  const int1 = 6760193;
  const int2 = 339709282;
  const float1 = 7788125.288298678;
  const float2 = 1695621.9088701617;
  it('can hash two different ints', () => {
    const hash1 = hashNumber(int1);
    const hash2 = hashNumber(int2);
    expect(hash1).to.be.not.equal(hash2);
  });

  it('can produce the same hash for ints', () => {
    const hash1 = hashNumber(int1);
    const hash2 = hashNumber(int1);
    expect(hash1).to.be.equal(hash2);
  });

  it('can hash two different floats', () => {
    const hash1 = hashNumber(float1);
    const hash2 = hashNumber(float2);
    expect(hash1).to.be.not.equal(hash2);
  });

  it('can produce the same hash for floats', () => {
    const hash1 = hashNumber(float1);
    const hash2 = hashNumber(float1);
    expect(hash1).to.be.equal(hash2);
  });
});

describe('hashDate', () => {
  const d1 = new Date();
  const d2 = new Date(d1.getTime() + 1000);
  it('can hash two different dates', () => {
    const hash1 = hashDate(d1);
    const hash2 = hashDate(d2);
    expect(hash1).to.be.not.equal(hash2);
  });

  it('can produce the same hash', () => {
    const hash1 = hashDate(d1);
    const hash2 = hashDate(d1);
    expect(hash1).to.be.equal(hash2);
  });
});

describe('hashNullable', () => {
  const mockHash = () => 444;
  it('can hash a null value', () => {
    expect(hashNullable(mockHash)(null)).to.be.equal(NULL_HASH);
  });

  it('can hash a non null value', () => {
    expect(hashNullable(mockHash)(8980)).to.be.equal(444);
  });
});

describe('hashOptional', () => {
  const mockHash = () => 444;
  it('can hash an optional value', () => {
    expect(hashOptional(mockHash)(undefined)).to.be.equal(UNDEFININED_HASH);
  });

  it('can hash a non null value', () => {
    expect(hashOptional(mockHash)(8980)).to.be.equal(444);
  });
});

describe('hashNullish', () => {
  const mockHash = () => 444;
  it('can hash an null value', () => {
    expect(hashNullish(mockHash)(null)).to.be.equal(NULL_HASH);
  });

  it('can hash an undefined value', () => {
    expect(hashNullish(mockHash)(undefined)).to.be.equal(UNDEFININED_HASH);
  });

  it('can hash a non nullish value', () => {
    expect(hashNullish(mockHash)(8980)).to.be.equal(444);
  });
});