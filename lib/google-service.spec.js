import MockAutocompleteService from '../test/mock-autocomplete-service';
import GoogleService from './google-service';

describe('GoogleService', () => {
  describe('.autocompleteService', () => {
    it('returns an instance of AutocompleteService', () => {
      expect(GoogleService.autocompleteService).toBeInstanceOf(MockAutocompleteService);
    });

    it('returns the same instance each time', () => {
      expect(GoogleService.autocompleteService).toBe(GoogleService.autocompleteService);
    });
  });

  describe('.placePredictions', () => {
    it('returns a function', () => {
      expect(GoogleService.placePredictions).toBeInstanceOf(Function);
    });

    it('returns a promise when calles', () => {
      expect(GoogleService.placePredictions('test')).toBeInstanceOf(Promise);
    });

    it('calls autocompleteService.getPlacePredictions', () => {
      GoogleService.placePredictions('test');
      expect(GoogleService.autocompleteService.getPlacePredictions).toHaveBeenCalledWith('test', expect.any(Function));
    });

    it('returns resolved data', async () => {
      await expect(GoogleService.placePredictions('test')).resolves.toEqual('test');
    });
  });
});
