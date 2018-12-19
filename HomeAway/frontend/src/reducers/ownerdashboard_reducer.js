import _ from "lodash";
import { OWNER_DASHBOARD } from "../actions";

const BOOKINGS_PER_PAGE = 5;

export default function (state = {}, action) {

  switch (action.type) {
    case OWNER_DASHBOARD:
      var booking_map = _.mapKeys(action.payload.data, "booking_id");
      if (action.payload.data) {
        var pageCount = 1
        var currPage = 1
        _.forEach(booking_map, function (value, key) {
          if (pageCount <= BOOKINGS_PER_PAGE) {
            value['page'] = currPage
          }
          else {
            pageCount = 1
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
