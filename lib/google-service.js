import autocompleteService from './autocomplete-service';

class GoogleService {
  static autocomplete = input => {
    return new Promise(resolve => {
      if (!input) {
        resolve([]);
        return;
      }

      autocompleteService().getPlacePredictions({ input, types: ['establishment'] }, resolve);
    });
  };
}

export default GoogleService;
