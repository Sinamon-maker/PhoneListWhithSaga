import {takeEvery, put, call} from 'redux-saga/effects'
import { RECEIVE_PHONE, UPDATE_LIST, RECEIVE_ERROR, RECEIVE_LIST} from './reducers/phone'
import {receivePhone} from './reducers/phone'
import { receivePhoneRequested} from './reducers/phone'

export function* sagaWatcher(){
  yield takeEvery(RECEIVE_PHONE, sagaWorker)
}

function* sagaWorker(action){
  try {
    console.log('i am in saga',action.number)
    const phoneReceived = yield call(receivePhoneRequested, action.number)
    
    yield put({ type: UPDATE_LIST, phoneReceived })

  } catch (error) {
console.log(error)
yield put({type: RECEIVE_ERROR, error})
  }

}