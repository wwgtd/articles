import { IArticle } from './articles'
import { ICategory } from './category'
import { IComment } from './comments'
import { IUser } from './users'

export interface Mock_DB {
  articles: { [index: string]: IArticle },
  category: { [index: string]: ICategory },
  comments: { [index: string]: IComment },
  users: { [index: string]: IUser },
}
