export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const LOADING_CATEGORY_ON = "LOADING_CATEGORY_ON";
export const LOADING_CATEGORY_OFF = "LOADING_CATEGORY_OFF";

export interface ICategorySyncAnswer {
  success: boolean;
  data?: ICategory;
}

export interface ICategoriesState {
  loadingStatus: boolean;
  data: { [index: string]: ICategory };
}

export interface ICategory {
  id: number;
  name: string;
}
