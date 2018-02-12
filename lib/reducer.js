import { bindActionCreators } from 'redux';
import GoogleService from './google-service';
import { call, fork, put, takeLatest } from 'redux-saga/effects';

//
// Action Types
//
export const QUERY_REQUESTED = Symbol('@results/QUERY_REQUESTTED');
export const QUERY_SUCCEEDED = Symbol('@results/QUERY_SUCCEEDED');
export const QUERY_FAILED = Symbol('@results/QUERY_FAILED');
export const SELECT_RESULT = Symbol('@results/SELECT_RESULT');
export const SET_VISIBLE = Symbol('@results/SET_VISIBLE');

//
// Actions
//
export const query = input => ({
  type: QUERY_REQUESTED,
  payload: input
});

export const setResultsVisible = visible => ({
  type: SET_VISIBLE,
  payload: visible
});

//
// Reducer
//
const initialState = {
  results: {},
  resultsVisible: false,
  selectedResult: null
};

const transformPlace = place => ({
  id: place.place_id,
  primary: place.structured_formatting.main_text,
  secondary: place.structured_formatting.secondary_text
});

const transformResults = results => results.reduce((object, place) => {
  object[place.place_id] = transformPlace(place);
  return object;
}, {});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case QUERY_SUCCEEDED:
      if (!payload) {
        return { ...state, results: {} };
      }

      return {
        ...state,
        results: transformResults(payload)
      };

    case QUERY_FAILED:
      return { ...state, results: {}, selectedResult: null };

    case SELECT_RESULT:
      return { ...state, selectedResult: state.results[payload] ? payload : null };

    case SET_VISIBLE:
      return { ...state, resultsVisible: payload };

    default:
      return state;
  }
};

//
// Sagas
//
export function * fetchResults({ payload }) {
  try {
    const results = yield call(GoogleService.getPlacePredictions, payload);
    yield put({ type: QUERY_SUCCEEDED, payload: results });
  } catch (err) {
    yield put({ type: QUERY_FAILED, payload: err.message });
  }
}

function * watchQuery() {
  yield takeLatest(QUERY_REQUESTED, fetchResults);
}

export const sagas = [
  fork(watchQuery)
];

//
// Selectors
//
export const selectResults = state => state.results;
export const resultsVisible = state => state.resultsVisible;

export const mapStateToProps = state => ({
  results: selectResults(state)
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  query
}, dispatch);
