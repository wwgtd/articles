export const REGISTER_USER  = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOADING_USERS_ON = 'LOADING_USERS_ON';
export const LOADING_USERS_OFF = 'LOADING_USERS_OFF';
export const USERS_WRITE_ERROR = 'USERS_WRITE_ERROR'

export interface IAuthData {
  id: number,
  token: string
}

export interface ILoginAnswer {
  success: boolean,
  errors?: string,
  auth_data?: IAuthData,
  user_data?: IUser
}

export interface IRegisterAnswer {
  success: boolean
}

export interface IUsersState {
  user_data: IUser | null,
  auth_data: IAuthData | null,
  errors: string | null,
  loadingStatus: boolean,
  isRegistrySuccess: boolean
}

export interface IUser {
  id: number,
  created_at: string,
  updated_at: string,
  name: string,
  password: string,
  email: string,
  access_level: string,
  activated: boolean
}
