import GoogleService from './google-service';

// Mock Google's AutocompleteService
const mockFunction = jest.fn();
jest.mock('./autocomplete-service', () => {
  return jest.fn().mockImplementation(() => {
    return { getPlacePredictions: mockFunction };
  });
});

describe('GoogleService', () => {
  beforeEach(() => {
    mockFunction.mockReset();
  });

  describe('.autocomplete', () => {
    it('returns a Promise', () => {
      expect(GoogleService.autocomplete()).toBeInstanceOf(Promise);
    });

    describe('when passed empty string', () => {
      it('resolves empty array', async () => {
        const results = await GoogleService.autocomplete('');
        expect(results).toEqual([]);
      });
    });

    describe('when passed a string', () => {
      it('calls AutocompleteService', () => {
        GoogleService.autocomplete('test');
        expect(mockFunction).toHaveBeenCalledWith({ input: 'test', types: ['establishment'] }, expect.any(Function));
      });

      it('resolves AutocompleteService result', async () => {
        const expectedResult = ['some', 'data', 'here'];
        mockFunction.mockImplementation((_, resolve) => resolve(expectedResult));
        const result = await GoogleService.autocomplete('test');

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
