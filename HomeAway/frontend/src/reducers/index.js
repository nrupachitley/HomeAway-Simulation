import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UpdateSinglePhoto from "./updatesinglephoto_reducer";
import AllOwnerProperties from "./ownerproperties_reducer";
import GetProperties from "./getproperties_reducer"
import GetProfileImg from "./getprofileimg_reducer"
import SignUp from "./signup_reducer"
import UpdateProfile from "./updateprofile_reducer"
import TravelerDashboard from "./travelerdashboard_reducer"
import OwnerDashboard from "./ownerdashboard_reducer"
import GetProfile from "./getprofile_reducer"
import SignIn from  "./signin_reducer";
import GetTravelerMessages from "./gettravelermessages_reducer";
import GetOwnerMessages from "./getownermessages_reducer";

const rootReducer = combineReducers({
    form: formReducer,
    properties: AllOwnerProperties,
    availableproperties: GetProperties,
    getprofileimg: GetProfileImg,
    signup: SignUp,
    newprofile: UpdateProfile,
    travelerdashboard: TravelerDashboard,
    ownerdashboard: OwnerDashboard,
    profile: GetProfile,
    photo: UpdateSinglePhoto,
    signin: SignIn,
    travelermessages: GetTravelerMessages,
    messages: GetOwnerMessages,
});

export default rootReducer;