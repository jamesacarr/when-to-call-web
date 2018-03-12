import { arrayToObject } from './util';

describe('util', () => {
  describe('arrayToObject', () => {
    const array = [
      { id: 'a', first: 'John', last: 'Doe' },
      { id: 'b', first: 'Jane', last: 'Doe' },
      { id: 'c', first: 'Bruce', last: 'Wayne' },
    ];

    it('converts array to object', () => {
      const expected = {
        a: { id: 'a', first: 'John', last: 'Doe' },
        b: { id: 'b', first: 'Jane', last: 'Doe' },
        c: { id: 'c', first: 'Bruce', last: 'Wayne' },
      };

      expect(arrayToObject(array, 'id')).toEqual(expected);
    });

    it('transforms data with supplied function', () => {
      const transform = data => ({
        id: data.id,
        firstName: data.first,
        lastName: data.last,
      });
      const expected = {
        a: { id: 'a', firstName: 'John', lastName: 'Doe' },
        b: { id: 'b', firstName: 'Jane', lastName: 'Doe' },
        c: { id: 'c', firstName: 'Bruce', lastName: 'Wayne' },
      };

      expect(arrayToObject(array, 'id', transform)).toEqual(expected);
    });
  });
});
