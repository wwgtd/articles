import { combineReducers } from "redux";
import articlesReducer from "./articlesReducer";
import categoriesReducer from "./categoriesReducer";
import commentsReducer from "./commentsReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  articles: articlesReducer,
  categories: categoriesReducer,
  comments: commentsReducer,
  users: usersReducer
});
