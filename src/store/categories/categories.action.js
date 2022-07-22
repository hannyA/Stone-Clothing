import { CATEGORIES_ACTION_TYPE } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categories) => {
  return createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);
};
