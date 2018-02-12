import { sagas as resultsSagas } from './reducer';
import { all } from 'redux-saga/effects';

export default function * sagas() {
  yield all([
    ...resultsSagas
  ]);
}
