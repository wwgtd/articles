import {
  CREATE_ARTICLE,
  SAVE_ARTICLES,
  SAVE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  LOADING_ARTICLE_ON,
  LOADING_ARTICLE_OFF,
  WRITE_ERROR_ARTICLE,
  IArticle
} from "../types/redux/articles";

/*const createActions => name => ({
  create: data => ({ type: `${name}_create`, payload: data ),
  delete: data => ({ type: `${name}_delete`, payload: data ),
  update: data => ({ type: `${name}_update`, payload: data ),
})
*/

export function createArticle(data: IArticle) {
  return {
    type: CREATE_ARTICLE,
    payload: data
  };
}

export function saveArticles(data: { [index: string]: IArticle }) {
  return {
    type: SAVE_ARTICLES,
    payload: data
  };
}

export function saveArticle(data: IArticle) {
  return {
    type: SAVE_ARTICLE,
    payload: data
  };
}

export function updateArticle(data: IArticle) {
  return {
    type: UPDATE_ARTICLE,
    payload: data
  };
}

export function deleteArticle(id: number) {
  return {
    type: DELETE_ARTICLE,
    payload: id
  };
}

export function writeError(error: string) {
  return {
    type: WRITE_ERROR_ARTICLE,
    payload: error
  };
}

export function loadingArticleOn() {
  return {
    type: LOADING_ARTICLE_ON
  };
}

export function loadingArticleOff() {
  return {
    type: LOADING_ARTICLE_OFF
  };
}

//connected = connect(state => ({ comments: state.comments[id] }))
