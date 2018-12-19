import _ from "lodash";
import { GET_PROPERTIES } from "../actions";

const PROPERTIES_PER_PAGE = 10;

export default function (state = {}, action) {

  console.log("Get Properties Reducer Action type = ", action.type)
  switch (action.type) {
    case GET_PROPERTIES:
      var property_map = _.mapKeys(action.payload.data, "p_id");
      var pages = 0
      var totalProperties = 0
      if (action.payload.data) {
        pages = parseInt(action.payload.data.length / PROPERTIES_PER_PAGE + 1)
        totalProperties = action.payload.data.length
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
        console.log("Property Map", property_map)
      }
      return {
        properties: property_map,
        pages: pages,
        totalProperties: totalProperties
      }
    default:
      return state;
  }
}
