import mockPromise from '../test/mock-promise';
import GoogleService from './google-service';
import initStore from './store';
import reducer, { mapStateToProps, performQuery, selectResult } from './ducks';

const initialState = {
  items: {},
  loadng: false,
  query: false,
  selected: null,
  visible: false,
};

describe('ducks/results', () => {
  describe('actions', () => {
    describe('performQuery', () => {
      let store;
      let storePromise;

      beforeEach(() => {
        store = initStore();
        GoogleService.getPlacePredictions = mockPromise();

        storePromise = store.dispatch(performQuery('testing'));
      });

      it('sets query', () => {
        expect(store.getState().query).toEqual('testing');
      });

      it('sets loading to true', () => {
        expect(store.getState().loading).toEqual(true);
      });

      it('calls GoogleService', () => {
        expect(GoogleService.getPlacePredictions).toHaveBeenCalledWith('testing');
      });

      describe('when GoogleService resolves', () => {
        beforeEach(async () => {
          const results = [
            { place_id: 'AB', structured_formatting: { main_text: 'A', secondary_text: 'B' } }, // eslint-disable-line camelcase
            { place_id: 'CD', structured_formatting: { main_text: 'C', secondary_text: 'D' } }, // eslint-disable-line camelcase
          ];

          GoogleService.getPlacePredictions.promises[0].resolve(results);
          await storePromise;
        });

        it('sets results', () => {
          const items = {
            AB: { id: 'AB', primary: 'A', secondary: 'B' },
            CD: { id: 'CD', primary: 'C', secondary: 'D' },
          };

          expect(store.getState().items).toEqual(items);
        });

        it('sets loading to false', () => {
          expect(store.getState().loading).toEqual(false);
        });

        it('sets visible to true', () => {
          expect(store.getState().visible).toEqual(true);
        });

        it('sets selected to null', () => {
          expect(store.getState().selected).toBeNull();
        });
      });

      describe('when GoogleService resolves old query', () => {
        beforeEach(async () => {
          const results = [
            { place_id: 'AB', structured_formatting: { main_text: 'A', secondary_text: 'B' } }, // eslint-disable-line camelcase
            { place_id: 'CD', structured_formatting: { main_text: 'C', secondary_text: 'D' } }, // eslint-disable-line camelcase
          ];

          store.dispatch(performQuery('more testing'));

          GoogleService.getPlacePredictions.promises[0].resolve(results);
          await storePromise;
        });

        it('does not set results', () => {
          expect(store.getState().items).toEqual({});
        });

        it('does not set loading', () => {
          expect(store.getState().loading).toEqual(true);
        });

        it('does not set visible', () => {
          expect(store.getState().visible).toEqual(false);
        });
      });

      describe('when GoogleService rejected', () => {
        beforeEach(async () => {
          GoogleService.getPlacePredictions.promises[0].reject(new Error('error'));
          await storePromise;
        });

        it('updates results', () => {
          expect(store.getState().items).toEqual({});
        });

        it('sets loading to false', () => {
          expect(store.getState().loading).toEqual(false);
        });
      });
    });

    describe('selectResult', () => {
      const state = {
        ...initialState,
        items: {
          abc: { id: 'abc', value: 123 },
          def: { id: 'def', value: 456 },
        },
      };

      it('sets selected to id when id exists', () => {
        const action = selectResult('abc');
        expect(reducer(state, action)).toEqual({ ...state, selected: 'abc' });
      });

      it('sets selected to null when id does not exist', () => {
        const action = selectResult('blah');
        expect(reducer(state, action)).toEqual(state);
      });
    });
  });

  describe('mapStateToProps', () => {
    const state = {
      items: {
        abc: { id: 'abc', value: 123 },
        def: { id: 'def', value: 456 },
      },
      loading: true,
      query: 'testing',
      selected: 'abc',
      visible: true,
    };

    it('maps loading', () => {
      expect(mapStateToProps(state).loading).toEqual(true);
    });

    it('maps results', () => {
      const expected = [{ id: 'abc', value: 123 }, { id: 'def', value: 456 }];
      expect(mapStateToProps(state).results).toEqual(expected);
    });

    it('maps visible', () => {
      expect(mapStateToProps(state).visible).toEqual(true);
    });
  });
});
