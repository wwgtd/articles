export interface ArticlePreviewProps {
  id: number,
  created_at: Date,
  updated_at: Date,
  category_id: string,
  body: string,
  title: string
}

export interface ArticlePageProps {
  isLoggedIn: boolean
}

export interface ArticleProps {
  article_id: number,
  isLoggedIn: boolean
}

export interface ArticleState {
  article: any
}

export interface ArticleListProps {
  articles: ArticlePreviewProps[]
}

export interface ArticleListState {
  [index: string]: any
}

export interface CommentProps {
  user_id: number,
  body: string,
  created_at: Date
}

export interface CreateArticleFormProps {

}

export interface LoginState {
  email: string,
  password: string,
  [index: string]: any
}

export interface SystemProps {
  isLoggedIn: boolean,
  username: string
}

export interface RegistryState {
  email: string,
  name: string,
  password: string,
  [index: string]: any
}
