import { IArticle, ISyncArticleAnswer } from "./articles";
import { ILoginAnswer, IAuthData } from "./users";
import { ICategorySyncAnswer, ICategory } from "./category";
import { ICommentSyncAnswer } from "./comments";

export interface ISuccessAnswer {
  success: boolean;
}

export interface ISyncParams {
  auth: IAuthData;
  data: {
    id?: number;
    user_id?: number;
    [index: string]: any;
  };
}

export interface API {
  articles: {
    create(params: ISyncParams): Promise<ISyncArticleAnswer>;
    getAll(): Promise<{ [index: number]: IArticle }>;
    getOne(id: number): Promise<IArticle>;
    update(params: ISyncParams): Promise<ISyncArticleAnswer>;
    delete(params: { auth: IAuthData; id: number }): Promise<ISuccessAnswer>;
  };

  category: {
    create(params: ISyncParams): Promise<ICategorySyncAnswer>;
    get(): Promise<{ [index: number]: ICategory }>;
    update(params: ISyncParams): Promise<ICategorySyncAnswer>;
    delete(params: { auth: IAuthData; id: number }): Promise<ISuccessAnswer>;
  };

  comments: {
    create(params: ISyncParams): Promise<ICommentSyncAnswer>;
    update(params: ISyncParams): Promise<ICommentSyncAnswer>;
  };

  users: {
    register(payload: {
      email: string;
      name: string;
      password: string;
    }): Promise<ISuccessAnswer>;
    login(payload: { email: string; password: string }): Promise<ILoginAnswer>;
    logout(payload: IAuthData): Promise<ISuccessAnswer>;
  };
}
