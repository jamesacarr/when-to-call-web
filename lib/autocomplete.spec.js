import autocomplete from './autocomplete';

const mockFunction = jest.fn();
class MockAutocompleteService {
  getPlacePredictions = mockFunction
}

describe('autocomplete', () => {
  beforeEach(() => {
    window.google = {
      maps: {
        places: {
          AutocompleteService: MockAutocompleteService
        }
      }
    };

    mockFunction.mockReset();
  });

  it('returns a Promise', () => {
    expect(autocomplete()).toBeInstanceOf(Promise);
  });

  describe('when passed empty string', () => {
    it('resolves empty array', async () => {
      const results = await autocomplete('');
      expect(results).toEqual([]);
    });
  });

  describe('when passed a string', () => {
    it('calls AutocompleteService', () => {
      autocomplete('test');
      expect(mockFunction).toHaveBeenCalledWith({ input: 'test', types: ['establishment'] }, expect.any(Function));
    });

    it('resolves AutocompleteService result', async () => {
      const expectedResult = ['some', 'data', 'here'];
      mockFunction.mockImplementation((_, resolve) => resolve(expectedResult));
      const result = await autocomplete('test');

      expect(result).toEqual(expectedResult);
    });
  });
});
