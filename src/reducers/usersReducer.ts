import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, LOADING_USERS_ON, LOADING_USERS_OFF, USERS_WRITE_ERROR, IUsersState } from '../types/redux/users'

const initialState: IUsersState = {
  user_data: null,
  auth_data: null,
  errors: null,
  loadingStatus: false,
  isRegistrySuccess: false
}

export default function usersReducer(state = initialState, action: {type: string, payload: any}): IUsersState {
  switch (action.type) {
    case LOGIN_USER: {
      if (action.payload.success === true) {
        return {
          user_data: action.payload.user_data,
          auth_data: action.payload.auth_data,
          errors: null,
          loadingStatus: state.loadingStatus,
          isRegistrySuccess: state.isRegistrySuccess
        }
      } else {
        return {
          user_data: null,
          auth_data: null,
          errors: action.payload.errors,
          loadingStatus: state.loadingStatus,
          isRegistrySuccess: state.isRegistrySuccess
        }
      }
    }

    case REGISTER_USER: {
      if (action.payload.success === false) {
        return {
          user_data: state.user_data,
          auth_data: state.auth_data,
          errors: 'user with that e-mail already registered',
          loadingStatus: state.loadingStatus,
          isRegistrySuccess: false
        }
      } else return {
        user_data: state.user_data,
        auth_data: state.auth_data,
        errors: null,
        loadingStatus: state.loadingStatus,
        isRegistrySuccess: true
      }
    }

    case LOGOUT_USER: {
      if (action.payload.success === true) {
        return {
          user_data: null,
          auth_data: null,
          errors: null,
          loadingStatus: state.loadingStatus,
          isRegistrySuccess: state.isRegistrySuccess
        }
      } else {
        return {
          user_data: state.user_data,
          auth_data: state.auth_data,
          errors: 'error',
          loadingStatus: state.loadingStatus,
          isRegistrySuccess: state.isRegistrySuccess
        }
      }
    }

    case LOADING_USERS_ON: {
      return {
        user_data: state.user_data,
        auth_data: state.auth_data,
        errors: state.errors,
        loadingStatus: true,
        isRegistrySuccess: state.isRegistrySuccess
      }
    }

    case LOADING_USERS_OFF: {
      return {
        user_data: state.user_data,
        auth_data: state.auth_data,
        errors: state.errors,
        loadingStatus: false,
        isRegistrySuccess: state.isRegistrySuccess
      }
    }

    case USERS_WRITE_ERROR: {
      return {
        user_data: state.user_data,
        auth_data: state.auth_data,
        errors: action.payload,
        loadingStatus: state.loadingStatus,
        isRegistrySuccess: state.isRegistrySuccess
      }
    }

    default: {
      return {
        user_data: state.user_data,
        auth_data: state.auth_data,
        errors: state.errors,
        loadingStatus: state.loadingStatus,
        isRegistrySuccess: state.isRegistrySuccess
      }
    }
  }
}
