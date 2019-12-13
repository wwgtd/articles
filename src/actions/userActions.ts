import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, LOADING_USERS_ON, LOADING_USERS_OFF, USERS_WRITE_ERROR, ILoginAnswer } from '../types/redux/users'
import { ISuccessAnswer } from '../types/redux/api'

export function registerUser(data: ISuccessAnswer) {
  return {
    type: REGISTER_USER,
    payload: data
  }
}

export function loginUser(data: ILoginAnswer) {
  return {
    type: LOGIN_USER,
    payload: data
  }
}

export function logoutUser(data: ISuccessAnswer) {
  return {
    type: LOGOUT_USER,
    payload: data
  }
}

export function writeLoginError(error: string) {
  return {
    type: USERS_WRITE_ERROR,
    payload: error
  }
}

export function userLoadingOn() {
  return {
    type: LOADING_USERS_ON
  }
}

export function userLoadingOff() {
  return {
    type: LOADING_USERS_OFF
  }
}
