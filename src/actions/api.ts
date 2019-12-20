import { API, ISyncParams, ISuccessAnswer } from "../types/redux/api";
import { IArticle, ISyncArticleAnswer } from "../types/redux/articles";
import { ICategory, ICategorySyncAnswer } from "../types/redux/category";
import { ICommentSyncAnswer } from "../types/redux/comments";
import { ILoginAnswer, IAuthData } from "../types/redux/users";
import { Mock_DB } from "../types/redux/mock_db";
import InitialMockDb from "./initialMockDb";

import {
  createArticle,
  saveArticles,
  saveArticle,
  updateArticle,
  deleteArticle,
  writeError,
  loadingArticleOn,
  loadingArticleOff
} from "./articlesActions";
import {
  createCategory,
  saveCategories,
  updateCategory,
  deleteCategory,
  loadingCategoryOn,
  loadingCategoryOff
} from "./categoriesActions";
import { loadingCommentOn, loadingCommentOff } from "./commentsActions";
import {
  registerUser,
  loginUser,
  logoutUser,
  userLoadingOn,
  userLoadingOff,
  writeLoginError
} from "./userActions";

let mock_db: Mock_DB = InitialMockDb;

if (window.localStorage.hasOwnProperty("mock")) {
  mock_db = JSON.parse(window.localStorage.getItem("mock")!);
}

let article_id =
  Object.keys(mock_db.articles).length !== 0
    ? Object.keys(mock_db.articles).length
    : 0;
let category_id =
  Object.keys(mock_db.category).length !== 0
    ? Object.keys(mock_db.category).length
    : 0;
let comment_id =
  Object.keys(mock_db.comments).length !== 0
    ? Object.keys(mock_db.comments).length
    : 0;
let user_id =
  Object.keys(mock_db.users).length !== 0
    ? Object.keys(mock_db.users).length
    : 0;

window.addEventListener("userCreated", function(e: any) {
  let db: string = JSON.stringify(mock_db);
  window.localStorage.setItem("mock", db);
});

window.addEventListener("beforeunload", function(e: any) {
  let db: string = JSON.stringify(mock_db);
  window.localStorage.setItem("mock", db);
});


window.addEventListener("userCreated", function(e: any) {
  let db: string = JSON.stringify(mock_db);
  window.localStorage.setItem("mock", db);
});

export const clearMockData = () => {
  mock_db = {
    articles: {},
    category: {},
    comments: {},
    users: {}
  };
  let db: string = JSON.stringify(mock_db);
  window.localStorage.setItem("mock", db);

  window.history.pushState({}, "", "/");
  window.history.go(1);
  window.location.reload(true);
};

const mock_api: API = {
  articles: {
    create: (params: ISyncParams) =>
      new Promise<ISyncArticleAnswer>((res, rej) => {
        if (params.auth.token !== "1") res({ success: false });
        mock_db.articles = {
          ...mock_db.articles,
          [article_id]: {
            id: article_id,
            ...params.data,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
          }
        };
        const target = mock_db.articles[article_id];
        article_id++;
        res({ success: true, data: target });
      }),

    getAll: () =>
      new Promise<{ [index: number]: IArticle }>((res, rej) => {
        res(mock_db.articles);
      }),

    getOne: (id: number) =>
      new Promise<IArticle>((res, rej) => {
        if (mock_db.articles[id] === undefined)
          rej(new Error("incorrect article id"));
        const target: IArticle = { ...mock_db.articles[id] };

        for (let prop in mock_db.users) {
          if (mock_db.users[prop].id === target.user_id) {
            target.user = mock_db.users[prop];
            break;
          }
        }

        target.comments = [];

        for (let prop in mock_db.comments) {
          if (mock_db.comments[prop].article_id === id) {
            let user_id = mock_db.comments[prop].user_id;
            let user_info;
            for (let prop in mock_db.users) {
              if (mock_db.users[prop].id === user_id) {
                user_info = mock_db.users[prop];
                break;
              }
            }
            target.comments.push({
              ...mock_db.comments[prop],
              user: user_info
            });
          }
        }
        res(target);
      }),

    update: (params: ISyncParams) =>
      new Promise<ISyncArticleAnswer>((res, rej) => {
        if (params.auth.token !== "1") res({ success: false });
        if (mock_db.articles[params.data.id!] === undefined)
          res({ success: false });
        mock_db.articles[params.data.id!] = {
          ...mock_db.articles[params.data.id!],
          ...params.data,
          updated_at: new Date().toLocaleString()
        };
        res({ success: true, data: mock_db.articles[params.data.id!] });
      }),

    delete: (params: { auth: IAuthData; id: number }) =>
      new Promise<ISuccessAnswer>((res, rej) => {
        if (params.auth.token !== "1") res({ success: false });

        if (mock_db.articles[params.id] !== undefined) {
          delete mock_db.articles[params.id];
          res({ success: true });
        } else res({ success: false });
      })
  },

  category: {
    create: (params: ISyncParams) =>
      new Promise<ICategorySyncAnswer>((res, rej) => {
        if (params.auth.token !== "1") res({ success: false });
        mock_db.category[category_id] = {
          id: category_id,
          name: params.data.name
        };
        const target: ICategory = { ...mock_db.category[category_id] };
        category_id++;
        res({ success: true, data: target });
      }),

    get: () =>
      new Promise<{ [index: number]: ICategory }>((res, rej) => {
        res(mock_db.category);
      }),

    update: (params: ISyncParams) =>
      new Promise<ICategorySyncAnswer>((res, rej) => {
        if (params.auth.token !== "1") res({ success: false });

        if (mock_db.category[params.data.id!]) {
          mock_db.category[params.data.id!].name = params.data.name;
          const target: ICategory = { ...mock_db.category[params.data.id!] };
          res({ success: true, data: target });
        } else {
          res({ success: false });
        }
      }),

    delete: (params: { auth: IAuthData; id: number }) =>
      new Promise<ISuccessAnswer>((res, rej) => {
        if (mock_db.category[params.id] !== undefined) {
          delete mock_db.category[params.id];
          res({ success: true });
        } else res({ success: false });
      })
  },

  comments: {
    create: (params: ISyncParams) =>
      new Promise<ICommentSyncAnswer>((res, rej) => {
        if (params.auth.token !== "1") res({ success: false });
        const id = comment_id;
        mock_db.comments[id] = {
          id,
          body: params.data.body,
          user_id: params.data.user_id!,
          article_id: params.data.article_id,
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString()
        };
        comment_id++;
        console.log("incomments" + comment_id);
        res({ success: true });
      }),

    update: (params: ISyncParams) =>
      new Promise<ICommentSyncAnswer>((res, rej) => {
        if (!mock_db.comments[params.data.id!] || params.auth.token !== "1") {
          res({ success: false });
        }
        mock_db.comments[params.data.id!] = {
          ...mock_db.comments[params.data.id!],
          ...params.data,
          updated_at: new Date().toLocaleString()
        };
        res({ success: true });
      })
  },

  users: {
    register: (payload: { name: string; password: string; email: string }) =>
      new Promise<ISuccessAnswer>((res, rej) => {
        if (mock_db.users[payload.email] !== undefined) {
          res({ success: false });
        }
        mock_db.users[payload.email] = {
          ...payload,
          id: user_id,
          access_level: "10",
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
          activated: true
        };
        user_id++;
        const event = new Event("userCreated");
        window.dispatchEvent(event);
        res({ success: true });
      }),

    login: (payload: { email: string; password: string }) =>
      new Promise<ILoginAnswer>((res, rej) => {
        if (mock_db.users[payload.email]) {
          if (mock_db.users[payload.email].password === payload.password) {
            res({
              success: true,
              auth_data: { id: mock_db.users[payload.email].id, token: "1" },
              user_data: mock_db.users[payload.email]
            });
          } else {
            res({ success: false, errors: "incorrect password" });
          }
        } else res({ success: false, errors: "no such user" });
      }),

    logout: (payload: IAuthData) =>
      new Promise<ISuccessAnswer>((res, rej) => {
        res({ success: true });
      })
  }
};

// thunk

function getAPI(api: API) {
  const articles = {
    create(payload: { title: string; body: string; category_id: number }) {
      return (dispatch: any, getState: any) => {
        dispatch(loadingArticleOn());
        const auth = getState().users.auth_data;
        const request_data: ISyncParams = {
          auth,
          data: { ...payload, user_id: auth.id }
        };
        api.articles.create(request_data).then(ans => {
          if (ans.success) {
            dispatch(createArticle(ans.data!));
            dispatch(loadingArticleOff());
          } else dispatch(writeError("error"));
        });
      };
    },

    getAll() {
      return (dispatch: any) => {
        dispatch(loadingArticleOn());
        api.articles.getAll().then(data => {
          dispatch(saveArticles(data));
          dispatch(loadingArticleOff());
        });
      };
    },

    getOne(id: number) {
      return (dispatch: any) => {
        dispatch(loadingArticleOn());
        api.articles.getOne(id).then(data => {
          dispatch(saveArticle(data));
          dispatch(loadingArticleOff());
        });
      };
    },

    update(payload: {
      id: number;
      title?: string;
      body?: string;
      category_id?: number;
    }) {
      return (dispatch: any, getState: any) => {
        dispatch(loadingArticleOn());
        const auth = getState().users.auth_data;
        const request_data: ISyncParams = { auth, data: payload };
        api.articles.update(request_data).then(ans => {
          if (ans.success) {
            dispatch(updateArticle(ans.data!));
            dispatch(loadingArticleOff());
          } else dispatch(writeError("error"));
        });
      };
    },

    delete(id: number) {
      return (dispatch: any, getState: any) => {
        dispatch(loadingArticleOn());
        const auth = getState().users.auth_data;
        const request_data = { auth, id };
        api.articles.delete(request_data).then(answer => {
          if (answer.success) {
            dispatch(deleteArticle(id));
            dispatch(loadingArticleOff());
          }
        });
      };
    }
  };

  const category = {
    create: (name: string) => (dispatch: any, getState: any) => {
      dispatch(loadingCategoryOn());
      const auth = getState().users.auth_data;
      const request_data: ISyncParams = {
        auth,
        data: { name, user_id: auth.id }
      };
      api.category.create(request_data).then(ans => {
        if (ans.success) {
          dispatch(createCategory(ans.data!));
          dispatch(loadingArticleOff());
        } else throw new Error("error");
      });
    },

    get: () => (dispatch: any) => {
      dispatch(loadingCategoryOn());
      api.category.get().then(ans => {
        dispatch(saveCategories(ans));
        dispatch(loadingCategoryOff());
      });
    },

    update: (params: { id: number; newName: string }) => (
      dispatch: any,
      getState: any
    ) => {
      dispatch(loadingCategoryOn());
      const auth = getState().users.auth_data;
      const request_data: ISyncParams = {
        auth,
        data: { id: params.id, name: params.newName }
      };
      api.category.update(request_data).then(ans => {
        if (ans.success) {
          dispatch(updateCategory(ans.data!));
          console.log(ans.data);
          dispatch(loadingCategoryOff());
        } else throw new Error("error");
      });
    },

    delete: (id: number) => (dispatch: any, getState: any) => {
      dispatch(loadingCategoryOn());
      const auth = getState().users.auth_data;
      const request_data = { auth, id };
      console.log(request_data);
      api.category.delete(request_data).then(ans => {
        if (ans.success) {
          dispatch(deleteCategory(id));
          dispatch(loadingCategoryOff());
        } else throw new Error("error");
      });
    }
  };

  const comments = {
    create: (params: { article_id: number; body: string }) => (
      dispatch: any,
      getState: any
    ) => {
      dispatch(loadingCommentOn());
      const auth = getState().users.auth_data;
      const request_data: ISyncParams = {
        auth,
        data: { ...params, user_id: auth.id }
      };
      api.comments.create(request_data).then(ans => {
        if (ans.success) {
          dispatch(loadingCommentOff());
        } else throw new Error("error");
      });
    },

    update: (params: { id: number; body: any }) => (
      dispatch: any,
      getState: any
    ) => {
      dispatch(loadingCommentOn());
      const auth = getState().users.auth_data;
      const request_data: ISyncParams = { auth, data: params };
      api.comments.update(request_data).then(ans => {
        if (ans.success) {
          dispatch(loadingCommentOff());
        } else throw new Error("error");
      });
    }
  };

  const users = {
    login: (payload: { email: string; password: string }) => (
      dispatch: any
    ) => {
      dispatch(userLoadingOn());
      api.users.login(payload).then(ans => {
        if (ans.success) {
          dispatch(loginUser(ans));
          dispatch(userLoadingOff());
          return true;
        } else {
          dispatch(writeLoginError(ans.errors!));
          dispatch(userLoadingOff());
          return false;
        }
      });
    },

    logout: (payload: IAuthData) => (dispatch: any) => {
      dispatch(userLoadingOn());
      api.users.logout(payload).then(ans => {
        dispatch(logoutUser(ans));
        dispatch(userLoadingOff());
      });
    },

    register: (payload: { name: string; password: string; email: string }) => (
      dispatch: any
    ) => {
      dispatch(userLoadingOn());
      api.users.register(payload).then(ans => {
        dispatch(registerUser(ans));
        dispatch(userLoadingOff());
        return ans.success;
      });
    }
  };

  return { articles, comments, category, users };
}

const api = getAPI(mock_api);
export { api };
