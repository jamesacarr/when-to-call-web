import axios from 'axios';
import { getPredictions, getDetails } from './api-service';

describe('api-service', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  describe('.getPredications', () => {
    it('calls axios with query', () => {
      const expectedURL = 'http://localhost:3001/places';
      const expectedParams = { params: { q: 'test' } };
      getPredictions('test');

      expect(axios.get).toHaveBeenCalledWith(expectedURL, expectedParams);
    });

    it('returns data from API', async () => {
      const response = { data: { some: 'data' } };
      const promise = getPredictions('test');
      axios.get.mock.promises[0].resolve(response);

      await expect(promise).resolves.toEqual(response.data);
    });
  });

  describe('.getDetails', () => {
    it('calls axios with id', () => {
      const expectedURL = 'http://localhost:3001/places/abc';
      const expectedParams = { params: undefined };
      getDetails('abc');

      expect(axios.get).toHaveBeenCalledWith(expectedURL, expectedParams);
    });

    it('returns data from API', async () => {
      const response = { data: { some: 'data' } };
      const promise = getDetails('test');
      axios.get.mock.promises[0].resolve(response);

      await expect(promise).resolves.toEqual(response.data);
    });
  });
});
