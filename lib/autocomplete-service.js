let autocompleteService;

export default () => {
  if (!autocompleteService) {
    autocompleteService = new window.google.maps.places.AutocompleteService();
  }

  return autocompleteService;
};
