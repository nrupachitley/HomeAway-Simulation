import { GET_PROFILE } from "../actions";

export default function (state = {}, action) {

  switch (action.type) {
    case GET_PROFILE:
      return action.payload.data;
    default:
      return state;
  }
}
