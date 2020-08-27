import { describe, it } from 'mocha';
import * as chai from 'chai';
import {
  hashObject,
} from '../hashObject';

const expect = chai.expect;

describe('hashObject', () => {
  const obj1 = {
    prop1: 123,
    prop2: 'hello',
    prop3: new Date(),
    prop4: false,
  };

  const obj2 = {
    ...obj1,
  };

  const obj3 = {
    ...obj1,
    someOtherProp: 'xxx',
  };
  
  it('can produce the same hash twice', () => {
    const hasher = hashObject(['prop1', 'prop2', 'prop3', 'prop4']);
    expect(hasher(obj1)).to.equal(hasher(obj1));
  });

  it('can hash identical objects', () => {
    const hasher = hashObject(['prop1', 'prop2', 'prop3', 'prop4']);
    expect(hasher(obj1)).to.equal(hasher(obj2));
  });

  it('can hash different objects', () => {
    const hasher = hashObject<any>(['prop1', 'prop2', 'prop3', 'prop4', 'someOtherProp']);
    expect(hasher(obj1)).to.not.equal(hasher(obj3));
  });

  it('can hash different objects partially', () => {
    const hasher = hashObject<any>(['prop1', 'prop2', 'prop3', 'prop4']);
    expect(hasher(obj1)).to.equal(hasher(obj3));
  });
});