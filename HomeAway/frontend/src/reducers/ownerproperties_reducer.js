import _ from "lodash";
import { ALL_OWNER_PROPERTIES } from "../actions";

var PROPERTIES_PER_PAGE = 5

export default function (state = {}, action) {

  switch (action.type) {
    case ALL_OWNER_PROPERTIES:
      var property_map = _.mapKeys(action.payload.data, "id");
      if (action.payload.data) {
        var pageCount = 1
        var currPage = 1
        _.forEach(property_map, function (value, key) {
          if (pageCount <= PROPERTIES_PER_PAGE) {
            value['page'] = currPage
          }
          else {
            pageCount = 1
            currPage++
            value['page'] = currPage
          }
          pageCount = pageCount + 1
        })
        console.log("Properties Map", property_map)
      }
      return property_map
    default:
      return state;
  }
}
