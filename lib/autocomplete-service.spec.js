import autocompleteService from './autocomplete-service';

class MockAutocompleteService {}
window.google = {
  maps: {
    places: {
      AutocompleteService: MockAutocompleteService
    }
  }
};

describe('autocompleteService', () => {
  it('returns an instance of AutocompleteService', () => {
    expect(autocompleteService()).toBeInstanceOf(MockAutocompleteService);
  });

  it('returns the same instance each time', () => {
    expect(autocompleteService()).toBe(autocompleteService());
  });
});
