import { UPLOAD_SNGLE_PHOTO } from "../actions";

export default function (state = {}, action) {

  switch (action.type) {
    case UPLOAD_SNGLE_PHOTO:
      return action.payload.data;
    default:
      return state;
  }
}
