import { IUser } from './users'
export const LOADING_COMMENT_ON = 'LOADING_COMMENT_ON'
export const LOADING_COMMENT_OFF = 'LOADING_COMMENT_OFF'


export interface ICommentSyncAnswer {
  success: boolean
}

export interface ICommentsState {
  loadingStatus: boolean
}

export interface IComment {
  id: number,
  created_at: string,
  updated_at: string,
  user_id: number,
  body: string,
  article_id: number,
  user?: IUser
}
