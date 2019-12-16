import {
  CREATE_CATEGORY,
  GET_CATEGORIES,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  LOADING_CATEGORY_ON,
  LOADING_CATEGORY_OFF
} from "../types/redux/category";
import { ICategory } from "../types/redux/category";

export function createCategory(data: ICategory) {
  return {
    type: CREATE_CATEGORY,
    payload: data
  };
}

export function saveCategories(data: { [index: string]: ICategory }) {
  return {
    type: GET_CATEGORIES,
    payload: data
  };
}

export function updateCategory(data: { id: number; name: string }) {
  return {
    type: UPDATE_CATEGORY,
    payload: data
  };
}

export function deleteCategory(id: number) {
  return {
    type: DELETE_CATEGORY,
    payload: id
  };
}

export function loadingCategoryOn() {
  return {
    type: LOADING_CATEGORY_ON
  };
}

export function loadingCategoryOff() {
  return {
    type: LOADING_CATEGORY_OFF
  };
}
