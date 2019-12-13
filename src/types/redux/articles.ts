import { IComment } from './comments'
import { IUser } from './users'

export const CREATE_ARTICLE = 'CREATE_ARTICLE'
export const SAVE_ARTICLES = 'SAVE_ARTICLES';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const LOADING_ARTICLE_ON = 'LOADING_ARTICLE_ON'
export const LOADING_ARTICLE_OFF = 'LOADING_ARTICLE_OFF'
export const WRITE_ERROR_ARTICLE = 'WRITE_ERROR_ARTICLE'

export interface ISyncArticleAnswer {
  success: boolean,
  data?: IArticle
}

export interface IArticlesState {
  data: { [index: string]: IArticle }
  loadingStatus: boolean,
  current: IArticle | undefined,
  errors: string | undefined,
}

export interface IArticle {
  id: number,
  created_at: string,
  updated_at: string,
  category_id: number,
  body: string,
  title: string,
  user_id: number,
  user?: IUser,
  icon_id?: string,
  comments?: Array<IComment>
}
