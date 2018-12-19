import _ from "lodash";
import { GET_OWNER_MESSAGES } from "../actions";

export default function (state = {}, action) {

  console.log("In reducer: ", action.type)
  switch (action.type) {
    case GET_OWNER_MESSAGES:
      var mapped_list = _.mapKeys(action.payload.data, function(value, key){
          return key;
      });
      console.log("Here = ", mapped_list)
      return mapped_list
    default:
      return state;
  }
}
