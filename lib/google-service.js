import promisify from './promisify';

const _AutocompleteService = Symbol('AutocompleteService');
const _placePredictions = Symbol('getPlacePredictions');

class GoogleService {
  get autocompleteService() {
    if (!this[_AutocompleteService]) {
      this[_AutocompleteService] = new window.google.maps.places.AutocompleteService();
    }

    return this[_AutocompleteService];
  }

  get placePredictions() {
    if (!this[_placePredictions]) {
      this[_placePredictions] = promisify(this.autocompleteService.getPlacePredictions.bind(this.autocompleteService));
    }

    return this[_placePredictions];
  }

  getPlacePredictions = input => {
    if (!input) {
      return Promise.resolve([]);
    }

    return this.placePredictions({ input });
  };

  placeDetails(map, placeId) {
    return new Promise(resolve => {
      if (!map || !placeId) {
        resolve(null);
        return;
      }

      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({ placeId }, resolve);
    });
  }
}

export default new GoogleService();
