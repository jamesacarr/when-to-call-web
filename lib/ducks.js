import { bindActionCreators } from 'redux';
import { createAction, createReducer } from 'redux-act';
import GoogleService from './google-service';
import { arrayToObject } from './util';

//
// Action Types
//
const QUERY_REQUESTED = 'when-to-call/REQUESTTED';
const QUERY_SUCCEEDED = 'when-to-call/SUCCEEDED';
const QUERY_FAILED = 'when-to-call/FAILED';
const SELECT = 'when-to-call/SELECT';

//
// Actions
//
const transformPlace = place => ({
  id: place.place_id,
  primary: place.structured_formatting.main_text,
  secondary: place.structured_formatting.secondary_text,
});

const queryRequested = createAction(QUERY_REQUESTED);
const querySucceeded = createAction(QUERY_SUCCEEDED, (items, query) => ({ items, query }));
const queryFailed = createAction(QUERY_FAILED);
export const selectResult = createAction(SELECT);

export const performQuery = input => dispatch => {
  dispatch(queryRequested(input));

  GoogleService.getPlacePredictions(input)
    .then(results => arrayToObject(results, 'place_id', transformPlace))
    .then(results => {
      dispatch(querySucceeded(results, input));
    })
    .catch(err => {
      dispatch(queryFailed(err.message));
    });
};

//
// Reducer
//
const initialState = {
  items: {},
  loading: false,
  query: '',
  selected: null,
  visible: false,
};

export default createReducer(
  {
    [queryRequested]: (state, payload) => ({ ...state, query: payload, loading: true }),
    [querySucceeded]: (state, { items, query }) =>
      query === state.query ? { ...state, items, query, loading: false, selected: null, visible: true } : state,
    [queryFailed]: state => ({ ...state, items: {}, loading: false }),
    [selectResult]: (state, payload) => ({ ...state, selected: state.items[payload] ? payload : null, visible: false }),
  },
  initialState
);

//
// Selectors
//
const loadingSelector = state => state.loading;
const resultsItemSelector = results => Object.values(results.items);
const resultsVisibleSelector = results => results.visible;

export const mapStateToProps = state => ({
  loading: loadingSelector(state),
  results: resultsItemSelector(state),
  visible: resultsVisibleSelector(state),
});

export const mapDispatchToProps = dispatch => bindActionCreators({ performQuery, selectResult }, dispatch);
