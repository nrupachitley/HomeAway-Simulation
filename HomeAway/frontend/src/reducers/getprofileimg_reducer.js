import { GET_PROFILEIMG } from "../actions";

export default function (state = {}, action) {

  switch (action.type) {
    case GET_PROFILEIMG:
      return action.payload.data;
    default:
      return state;
  }
}
