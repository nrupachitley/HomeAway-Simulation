import { UPDATE_PROFILE } from "../actions";

export default function (state = {}, action) {

  switch (action.type) {
    case UPDATE_PROFILE:
      return action.payload.data;
    default:
      return state;
  }
}
