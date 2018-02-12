import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MockAutocompleteService from './mock-autocomplete-service';

configure({ adapter: new Adapter() });

window.google = {
  maps: {
    places: {
      AutocompleteService: MockAutocompleteService,
      PlacesServiceStatus: {
        OK: 'OK',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS'
      }
    }
  }
};
