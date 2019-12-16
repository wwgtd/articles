import {
  CREATE_ARTICLE,
  SAVE_ARTICLES,
  SAVE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  LOADING_ARTICLE_ON,
  LOADING_ARTICLE_OFF,
  WRITE_ERROR_ARTICLE,
  IArticlesState
} from "../types/redux/articles";

const initialState: IArticlesState = {
  data: {},
  loadingStatus: false,
  current: undefined,
  errors: undefined
};

export default function articlesReducer(
  state = initialState,
  action: { type: string; payload: any }
): IArticlesState {
  switch (action.type) {
    case CREATE_ARTICLE: {
      return {
        data: { ...state.data, [action.payload.id]: action.payload },
        current: state.current,
        errors: undefined,
        loadingStatus: state.loadingStatus
      };
    }

    case SAVE_ARTICLES: {
      return {
        data: action.payload,
        current: undefined,
        errors: undefined,
        loadingStatus: state.loadingStatus
      };
    }

    case SAVE_ARTICLE: {
      return {
        data: state.data,
        current: action.payload,
        errors: undefined,
        loadingStatus: state.loadingStatus
      };
    }

    case UPDATE_ARTICLE: {
      return {
        data: { ...state.data, [action.payload.id]: action.payload },
        current: state.current,
        errors: state.errors,
        loadingStatus: state.loadingStatus
      };
    }

    case DELETE_ARTICLE: {
      const targetState = { ...state };
      delete state.data[action.payload];
      return targetState;
    }

    case WRITE_ERROR_ARTICLE: {
      return {
        data: state.data,
        current: state.current,
        errors: action.payload,
        loadingStatus: state.loadingStatus
      };
    }

    case LOADING_ARTICLE_ON: {
      return {
        data: state.data,
        current: state.current,
        errors: state.errors,
        loadingStatus: true
      };
    }

    case LOADING_ARTICLE_OFF: {
      return {
        data: state.data,
        current: state.current,
        errors: state.errors,
        loadingStatus: false
      };
    }

    default: {
      return {
        data: state.data,
        current: state.current,
        errors: state.errors,
        loadingStatus: state.loadingStatus
      };
    }
  }
}
