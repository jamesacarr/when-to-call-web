/* eslint-disable camelcase */

import GoogleService from './google-service';
import reducer, {
  query,
  setResultsVisible,
  fetchResults,
  QUERY_REQUESTED, QUERY_SUCCEEDED, QUERY_FAILED, SELECT_RESULT, SET_VISIBLE
} from './reducer';
import { call, put } from 'redux-saga/effects';

const initialState = {
  results: {},
  selectedResult: null,
  resultsVisible: false
};

describe('reducer', () => {
  describe('actions', () => {
    describe('query', () => {
      it('returns the type and payload', () => {
        const input = 'test';
        const expected = {
          type: QUERY_REQUESTED,
          payload: input
        };

        expect(query(input)).toEqual(expected);
      });
    });

    describe('setResultsVisible', () => {
      it('returns the type and payload', () => {
        const input = true;
        const expected = {
          type: SET_VISIBLE,
          payload: input
        };

        expect(setResultsVisible(input)).toEqual(expected);
      });
    });
  });

  describe('reducer', () => {
    describe('unknown type', () => {
      it('returns initial state if no existing state', () => {
        const action = { type: 'UNKNOWN' };
        expect(reducer(undefined, action)).toEqual(initialState);
      });

      it('returns existing state', () => {
        const existingState = {
          ...initialState,
          results: { test: { id: 'a' } },
          selectedResult: 'test'
        };
        const action = { type: 'UNKNOWN' };

        expect(reducer(existingState, action)).toEqual(existingState);
      });
    });

    describe('QUERY_SUCCEEDED', () => {
      it('returns empty array when payload null', () => {
        const action = { type: QUERY_SUCCEEDED, payload: null };
        expect(reducer(undefined, action)).toEqual(initialState);
      });

      it('returns formatted array', () => {
        const result = [
          { place_id: 'a', structured_formatting: { main_text: 'B', secondary_text: 'C' } },
          { place_id: 'd', structured_formatting: { main_text: 'E', secondary_text: 'F' } },
          { place_id: 'g', structured_formatting: { main_text: 'H', secondary_text: 'I' } }
        ];
        const action = { type: QUERY_SUCCEEDED, payload: result };
        const expected = {
          ...initialState,
          results: {
            a: { id: 'a', primary: 'B', secondary: 'C' },
            d: { id: 'd', primary: 'E', secondary: 'F' },
            g: { id: 'g', primary: 'H', secondary: 'I' }
          }
        };

        expect(reducer(undefined, action)).toEqual(expected);
      });
    });

    describe('QUERY_FAILED', () => {
      it('resets results and selectedResult', () => {
        const existingState = {
          ...initialState,
          results: { test: { id: 'a' } },
          selectedResult: 'test'
        };
        const action = { type: QUERY_FAILED };

        expect(reducer(existingState, action)).toEqual({ ...existingState, results: {}, selectedResult: null });
      });
    });

    describe('SELECT_RESULT', () => {
      it('sets selected result if exists', () => {
        const existingState = {
          ...initialState,
          results: {
            test: { id: 'a' }
          }
        };
        const action = { type: SELECT_RESULT, payload: 'test' };

        expect(reducer(existingState, action)).toEqual({ ...existingState, selectedResult: 'test' });
      });

      it('sets null if not exists', () => {
        const existingState = {
          ...initialState,
          results: {
            test: { id: 'a' }
          }
        };
        const action = { type: SELECT_RESULT, payload: 'blah' };

        expect(reducer(existingState, action)).toEqual({ ...existingState, selectedResult: null });
      });
    });
  });

  describe('sagas', () => {
    describe('fetchResults', () => {
      let gen;
      const action = { type: QUERY_REQUESTED, payload: 'test' };

      beforeEach(() => {
        gen = fetchResults(action);
      });

      it('calls GoogleService', () => {
        expect(gen.next().value).toEqual(call(GoogleService.getPlacePredictions, action.payload));
      });

      it('puts SUCCEEDED when successful', () => {
        const payload = [
          { place_id: 'a', structured_formatting: { main_text: 'B', secondary_text: 'C' } },
          { place_id: 'd', structured_formatting: { main_text: 'E', secondary_text: 'F' } },
          { place_id: 'g', structured_formatting: { main_text: 'H', secondary_text: 'I' } }
        ];

        gen.next(); // GoogleService call
        expect(gen.next(payload).value).toEqual(put({ type: QUERY_SUCCEEDED, payload }));
      });

      it('puts FAILED when error thrown', () => {
        const error = { message: 'abc' };

        gen.next(); // GoogleService call
        expect(gen.throw(error).value).toEqual(put({ type: QUERY_FAILED, payload: error.message }));
      });
    });
  });
});
