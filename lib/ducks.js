import { bindActionCreators } from 'redux';
import { createAction, createReducer } from 'redux-act';
import { getPredictions, getDetails } from './api-service';

//
// Action Types
//
const QUERY_REQUESTED = 'when-to-call/QUERY_REQUESTTED';
const QUERY_SUCCEEDED = 'when-to-call/QUERY_SUCCEEDED';
const QUERY_FAILED = 'when-to-call/QUERY_FAILED';
const SELECT_REQUESTED = 'when-to-call/SELECT_REQUESTED';
const SELECT_SUCCEEDED = 'when-to-call/SELECT_SUCCEEDED';
const SELECT_FAILED = 'when-to-call/SELECT_FAILED';

//
// Actions
//
const queryRequested = createAction(QUERY_REQUESTED);
const querySucceeded = createAction(QUERY_SUCCEEDED, (items, query) => ({ items, query }));
const queryFailed = createAction(QUERY_FAILED);
const selectRequested = createAction(SELECT_REQUESTED);
const selectSucceeded = createAction(SELECT_SUCCEEDED, (data, selected) => ({ data, selected }));
const selectFailed = createAction(SELECT_FAILED);

export const performQuery = input => dispatch => {
  dispatch(queryRequested(input));

  getPredictions(input)
    .then(results => {
      dispatch(querySucceeded(results, input));
    })
    .catch(err => {
      dispatch(queryFailed(err.message));
    });
};

export const selectResult = input => dispatch => {
  dispatch(selectRequested(input));

  getDetails(input)
    .then(results => {
      dispatch(selectSucceeded(results, input));
    })
    .catch(err => {
      dispatch(selectFailed(err.message));
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
  selectedData: null,
  visible: false,
};

export default createReducer(
  {
    [queryRequested]: (state, payload) => ({ ...state, query: payload, loading: true }),
    [querySucceeded]: (state, { items, query }) =>
      query === state.query ? { ...state, items, query, loading: false, selected: null, visible: true } : state,
    [queryFailed]: state => ({ ...state, items: {}, loading: false }),
    [selectRequested]: (state, payload) => ({
      ...state,
      selected: state.items[payload] ? payload : null,
      visible: false,
    }),
    [selectSucceeded]: (state, { data, selected }) =>
      selected === state.selected ? { ...state, selectedData: data } : state,
    [selectFailed]: state => ({ ...state, selected: null }),
  },
  initialState
);

//
// Selectors
//
const loadingSelector = state => state.loading;
const itemsSelector = state => Object.values(state.items);
const selectItemSelector = state => state.selectedData;
const visibleSelector = state => state.visible;

export const mapStateToProps = state => ({
  loading: loadingSelector(state),
  results: itemsSelector(state),
  selected: selectItemSelector(state),
  visible: visibleSelector(state),
});

export const mapDispatchToProps = dispatch => bindActionCreators({ performQuery, selectResult }, dispatch);
