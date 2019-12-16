import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  LOADING_CATEGORY_ON,
  LOADING_CATEGORY_OFF,
  ICategoriesState
} from "../types/redux/category";

const initialState: ICategoriesState = {
  loadingStatus: false,
  data: {}
};

export default function categoriesReducer(
  state = initialState,
  action: { type: string; payload: any }
): ICategoriesState {
  switch (action.type) {
    case CREATE_CATEGORY: {
      return {
        data: { ...state.data, [action.payload.id]: { ...action.payload } },
        loadingStatus: state.loadingStatus
      };
    }

    case GET_CATEGORIES: {
      return {
        data: { ...action.payload },
        loadingStatus: state.loadingStatus
      };
    }

    case UPDATE_CATEGORY: {
      return {
        data: {
          ...state.data,
          [action.payload.id]: { name: action.payload.name }
        },
        loadingStatus: state.loadingStatus
      };
    }

    case DELETE_CATEGORY: {
      const id = action.payload;
      const copy = Object.assign({}, state.data);
      delete copy[id!];
      return {
        data: copy,
        loadingStatus: state.loadingStatus
      };
    }

    case LOADING_CATEGORY_ON: {
      return {
        data: state.data,
        loadingStatus: true
      };
    }

    case LOADING_CATEGORY_OFF: {
      return {
        data: state.data,
        loadingStatus: false
      };
    }

    default: {
      return {
        data: state.data,
        loadingStatus: state.loadingStatus
      };
    }
  }
}
