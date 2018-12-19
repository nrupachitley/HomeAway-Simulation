import _ from "lodash";
import { TRAVELER_DASHBOARD } from "../actions";

const BOOKINGS_PER_PAGE = 6;

export default function (state = {}, action) {

  switch (action.type) {
    case TRAVELER_DASHBOARD:
      var booking_map = _.mapKeys(action.payload.data, "count");
      if (action.payload.data) {
        var pageCount = 1
        var currPage = 1
        _.forEach(booking_map, function (value, key) {
          if (pageCount < BOOKINGS_PER_PAGE) {
            value['page'] = currPage
          }
          else {
            pageCount = 0
            currPage++
            value['page'] = currPage
          }
          pageCount = pageCount + 1
        })
        console.log("Booking Map", booking_map)
      }
      return booking_map
    default:
      return state;
  }
}
