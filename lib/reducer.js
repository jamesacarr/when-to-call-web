import { bindActionCreators } from 'redux';
import GoogleService from './google-service';
import { arrayToObject } from './util';
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

export const setVisible = visible => ({
  type: SET_VISIBLE,
  payload: visible
});

//
// Reducer
//
const initialState = {
  results: {},
  loading: false,
  visible: false,
  selectedResult: null
};

const transformPlace = place => ({
  id: place.place_id,
  primary: place.structured_formatting.main_text,
  secondary: place.structured_formatting.secondary_text
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case QUERY_REQUESTED:
      return {
        ...state,
        loading: true
      };

    case QUERY_SUCCEEDED:
      return {
        ...state,
        results: payload ? arrayToObject(payload, 'place_id', transformPlace) : {},
        loading: false
      };

    case QUERY_FAILED:
      return {
        ...state,
        results: {},
        loading: false,
        selectedResult: null
      };

    case SELECT_RESULT:
      return {
        ...state,
        selectedResult: state.results[payload] ? payload : null
      };

    case SET_VISIBLE:
      return {
        ...state,
        visible: payload
      };

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
export const mapStateToProps = state => ({
  results: Object.values(state.results),
  loading: state.loading,
  visible: state.visible
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  query,
  setVisible
}, dispatch);
