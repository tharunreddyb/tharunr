import { call, put, take, race } from 'redux-saga/effects'

import { FETCH_DRONE_DATA_SUCCESS, API_ERROR, START_POLLING, STOP_POLLING } from '../actions';

import API from "../api";

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

function* fetchDroneData(action) {
  while (true) {
    try {
      const { data } = yield call(API.droneData)
      yield put({ type: FETCH_DRONE_DATA_SUCCESS, data: data })
      yield call(delay, 4000)
    } catch (error) {
      yield put({ type: API_ERROR, code: error.code })
    }
  }
}

function* watchPollDroneDataSaga() {
  while (true) {
    const data = yield take(START_POLLING)
    yield race([call(fetchDroneData, data), take(STOP_POLLING)])
  }
}

export default function* root() {
  yield [watchPollDroneDataSaga()]
}
