import _ from "lodash";
import { GET_TRAVELER_MESSAGES } from "../actions";

export default function (state = {}, action) {

  console.log("In reducer: ", action.type)
  switch (action.type) {
    case GET_TRAVELER_MESSAGES:
      console.log("Inside get traveler messages reducer =", action.payload.data)
      return _.mapKeys(action.payload.data, "_id");
    default:
      return state;
  }
}
