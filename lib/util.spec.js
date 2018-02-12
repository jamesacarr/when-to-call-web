import { arrayToObject } from './util';

describe('util', () => {
  describe('arrayToObject', () => {
    const array = [
      { id: 'a', first: 'John', last: 'Doe' },
      { id: 'b', first: 'Jane', last: 'Doe' },
      { id: 'c', first: 'Bruce', last: 'Wayne' }
    ];

    it('converts array to object', () => {
      const expected = {
        a: { id: 'a', first: 'John', last: 'Doe' },
        b: { id: 'b', first: 'Jane', last: 'Doe' },
        c: { id: 'c', first: 'Bruce', last: 'Wayne' }
      };

      expect(arrayToObject(array, 'id')).toEqual(expected);
    });

    it('transforms data with supplied function', () => {
      const transform = data => ({ id: data.id, first: data.last, last: data.first });
      const expected = {
        a: { id: 'a', last: 'John', first: 'Doe' },
        b: { id: 'b', last: 'Jane', first: 'Doe' },
        c: { id: 'c', last: 'Bruce', first: 'Wayne' }
      };

      expect(arrayToObject(array, 'id', transform)).toEqual(expected);
    });
  });
});
