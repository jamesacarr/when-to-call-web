import { getPredictions, getDetails } from './api-service';
import initStore from './store';
import { mapStateToProps, performQuery, selectResult, mapDispatchToProps } from './ducks';

jest.mock('./api-service.js');

describe('ducks/results', () => {
  beforeEach(() => {
    getPredictions.mockClear();
    getDetails.mockClear();
  });

  describe('actions', () => {
    describe('performQuery', () => {
      let store;
      let storePromise;

      beforeEach(() => {
        store = initStore();
        storePromise = store.dispatch(performQuery('testing'));
      });

      it('sets query', () => {
        expect(store.getState().query).toEqual('testing');
      });

      it('sets loading to true', () => {
        expect(store.getState().loading).toEqual(true);
      });

      it('calls getPredictions', () => {
        expect(getPredictions).toHaveBeenCalledWith('testing');
      });

      describe('when getPredictions resolves', () => {
        const results = {
          AB: { id: 'AB', primary: 'A', secondary: 'B' },
          CD: { id: 'CD', primary: 'C', secondary: 'D' },
        };

        beforeEach(async () => {
          getPredictions.mock.promises[0].resolve(results);
          await storePromise;
        });

        it('sets results', () => {
          expect(store.getState().items).toEqual(results);
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

      describe('when getPredictions resolves old query', () => {
        beforeEach(async () => {
          const results = [
            { place_id: 'AB', structured_formatting: { main_text: 'A', secondary_text: 'B' } }, // eslint-disable-line camelcase
            { place_id: 'CD', structured_formatting: { main_text: 'C', secondary_text: 'D' } }, // eslint-disable-line camelcase
          ];

          store.dispatch(performQuery('more testing'));

          getPredictions.mock.promises[0].resolve(results);
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

      describe('when getPredictions rejected', () => {
        beforeEach(async () => {
          getPredictions.mock.promises[0].reject(new Error('error'));
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
      let store;
      let storePromise;
      const state = {
        items: {
          abc: { id: 'abc', value: 123 },
          def: { id: 'def', value: 456 },
        },
        loadng: false,
        query: false,
        selected: null,
        selectedData: null,
        visible: true,
      };

      beforeEach(() => {
        store = initStore(state);
        storePromise = store.dispatch(selectResult('abc'));
      });

      it('sets visible to false', () => {
        expect(store.getState().visible).toEqual(false);
      });

      it('sets selected', () => {
        expect(store.getState().selected).toEqual('abc');
      });

      it('sets selected to null when id not found', () => {
        storePromise = store.dispatch(selectResult('blah'));
        expect(store.getState().selected).toBeNull();
      });

      it('calls getDetails', () => {
        expect(getDetails).toHaveBeenCalledWith('abc');
      });

      describe('when getDetails resolves', () => {
        beforeEach(async () => {
          const data = { some: 'data' };

          getDetails.mock.promises[0].resolve(data);
          await storePromise;
        });

        it('sets selectedData', () => {
          expect(store.getState().selectedData).toEqual({ some: 'data' });
        });
      });

      describe('when getDetails resolves old query', () => {
        beforeEach(async () => {
          const data = { old: 'data' };

          store.dispatch(selectResult('def'));

          getDetails.mock.promises[0].resolve(data);
          await storePromise;
        });

        it('does not set selectedData', () => {
          expect(store.getState().selectedData).toBeNull();
        });
      });

      describe('when getDetails rejected', () => {
        beforeEach(async () => {
          getDetails.mock.promises[0].reject(new Error('error'));
          await storePromise;
        });

        it('sets selected to null', () => {
          expect(store.getState().selected).toBeNull();
        });
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

  describe('mapDispatchToProps', () => {
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
    });

    it('binds dispatch to performQuery', () => {
      const { performQuery: boundPerformQuery } = mapDispatchToProps(dispatch);
      boundPerformQuery('abc');
      expect(dispatch).toHaveBeenCalled();
    });

    it('binds dispatch to selectResult', () => {
      const { selectResult: boundSelectResult } = mapDispatchToProps(dispatch);
      boundSelectResult('abc');
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
