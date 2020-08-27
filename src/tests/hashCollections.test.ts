import { describe, it } from 'mocha';
import * as chai from 'chai';
import {
  hashList,
  hashSet,
} from '../hashCollections';

const expect = chai.expect;

describe('hashList', () => {
  const list1 = [1,2,3,4];
  const list2 = [1,2,3,4];
  const list3 = [4,3,2,1];
  const list4 = [1,2,4,4];
  const list5 = [1,2,3,4,5];

  const mockHasher = (x: any) => x;

  it ('can produce the same hash twice', () => {
    expect(hashList(mockHasher)(list1)).to.equal(hashList(mockHasher)(list2));
  });

  it ('can produce a different hash if elements are switched', () => {
    expect(hashList(mockHasher)(list1)).to.not.equal(hashList(mockHasher)(list3));
  });

  it ('can produce a different hash from different lists', () => {
    expect(hashList(mockHasher)(list1)).to.not.equal(hashList(mockHasher)(list4));
  });

  it ('can produce a different hash from different lists', () => {
    expect(hashList(mockHasher)(list1)).to.not.equal(hashList(mockHasher)(list5));
  });
});

describe('hashSet', () => {
  const set1 = [1,2,3,4];
  const set2 = [1,2,3,4];
  const set3 = [4,3,2,1];
  const set4 = [1,2,4,4];
  const set5 = [1,2,3,4,5];

  const mockHasher = (x: any) => x;

  it ('can produce the same hash twice', () => {
    expect(hashSet(mockHasher)(set1)).to.equal(hashSet(mockHasher)(set2));
  });

  it ('can produce the same hash if elements are switched', () => {
    expect(hashSet(mockHasher)(set1)).to.equal(hashSet(mockHasher)(set3));
  });

  it ('can produce a different hash from different sets', () => {
    expect(hashSet(mockHasher)(set1)).to.not.equal(hashSet(mockHasher)(set4));
  });

  it ('can produce a different hash from different sets', () => {
    expect(hashSet(mockHasher)(set1)).to.not.equal(hashSet(mockHasher)(set5));
  });
});
