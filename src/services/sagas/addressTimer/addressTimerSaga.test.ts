import { it } from 'vitest';
import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { runTimer } from './addressTimerSaga';
import { Start, Stop, actionTypes } from './addressTimerSagaActions';
import { ONE_SECOND, wait } from '../utils';

it.skip("should disable the timer correctly", () => {
  return testSaga(runTimer)
    .next()
    .actionChannel(actionTypes.START)
    .next()
    .isDone()
})
