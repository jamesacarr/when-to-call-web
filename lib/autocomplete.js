let autocompleteService;

const getAutocompleteService = () => {
  if (!autocompleteService) {
    autocompleteService = new window.google.maps.places.AutocompleteService();
  }

  return autocompleteService;
};

export default input => {
  return new Promise(resolve => {
    if (!input) {
      resolve([]);
      return;
    }

    getAutocompleteService().getPlacePredictions({ input, types: ['establishment'] }, resolve);
  });
};
