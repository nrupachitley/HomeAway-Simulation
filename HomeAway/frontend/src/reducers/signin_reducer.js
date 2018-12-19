import { SIGN_IN } from "../actions";

export default function (state = {}, action) {

  switch (action.type) {
    case SIGN_IN:
      return action.payload.data;
    default:
      return state;
  }
}
