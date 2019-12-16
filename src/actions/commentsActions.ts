import {
  LOADING_COMMENT_ON,
  LOADING_COMMENT_OFF
} from "../types/redux/comments";

export function loadingCommentOn() {
  return {
    type: LOADING_COMMENT_ON
  };
}

export function loadingCommentOff() {
  return {
    type: LOADING_COMMENT_OFF
  };
}
