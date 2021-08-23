import axios from 'axios'
import { getSocket } from '../index'

const UPDATE_CODE = 'UPDATE_CODE'
export const UPDATE_LIST = 'UPDATE_LIST'
export const RECEIVE_LIST = 'RECEIVE_LIST'
export const RECEIVE_PHONE = 'RECEIVE_PHONE'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'

const initialState = {
  testPhone: 1,
  code: "",
  list: [],
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CODE: {
      return {
        ...state,
        code: action.code
      }
    }
    case UPDATE_LIST: {
      return {
        ...state,
        list: [action.phoneReceived, ...state.list]
      }
    }
    case RECEIVE_PHONE: {
      return {
        ...state,
        message: action.error
      }
    }
    case RECEIVE_LIST: {
      return {
        ...state,
        list: [...action.phones]
      }
    }
    default:
      return state
  }

}

export function updateCode(code) {
  return { type: UPDATE_CODE, code }
}

export function receivePhone(number){
  return { type: RECEIVE_PHONE, number}
}
//export function phoneToRedux(phone) {
 // return (dispatch, getState) => {
  //  const { code } = getState().phone
 //  axios.post('/api/v1/phone', { phone: `${code}${phone}` }).then(({ data }) => {

  //   dispatch({ type: UPDATE_LIST, phone: data })
   // })
  //}

//}
export async function receivePhoneRequested(phone) {

    const code  = +8

  console.log('code')
  const result = await  axios.post('/api/v1/phone', { phone: `${code}${phone}` }).then(({ data }) =>{


  console.log('data',data)
  return data}

  )
  console.log('result', result)
return result
}

export function phoneToReduxViaSocket(phone) {
  return (dispatch, getState) => {
    const { code } = getState().phone
    const data = {
      phone: `${code}${phone}`,
      type: UPDATE_LIST
    }

    getSocket().emit('action', data)
  }
}