import axios from "axios";

export const SIGN_IN = "sign_in";
export const SIGN_UP = "sign_up";
export const GET_PROFILEIMG = "get_profileimg";
export const GET_PROPERTIES = "get_properties";
export const GET_PROFILE = "get_profile";
export const UPDATE_PROFILE = "update_profile";
export const UPLOAD_SNGLE_PHOTO = "upload_single_photo";
export const MAKE_BOOKING = "make_booking";
export const TRAVELER_DASHBOARD = "traveler_dashboard";
export const INSERT_LOCATION = "insert_location";
export const INSERT_DETAILS = "insert_details";
export const OWNER_DASHBOARD = "owner_dashboard";
export const ALL_OWNER_PROPERTIES = "all_owner_properties";
export const UPDATE_BOOKING_STATUS = "update_booking_status";
export const INSERT_PROFILE = "insert_profile";
export const INSERT_PROPERTY = "insert_property";
export const GET_TRAVELER_MESSAGES = "get_traveler_messages";
export const SEND_MESSAGE = "send_message";
export const GET_OWNER_MESSAGES = "get_owner_messages";

export function signin(values, callback) {
    const response = axios
        .post('/api/setSignin/', values)
        .then((response) => {
            console.log("response: ", response)
            callback(response.data)
        });

    return {
        type: SIGN_IN,
        payload: response
    };
}

export function signup(values) {
    console.log("value", values)
    const response = axios.post('/api/setSignup/', values)

    return {
        type: SIGN_UP,
        payload: response
    }

}

export async function getprofileimg(values) {
    let response = await axios.get('/api/getProfileImg/', { params: values })
    console.log("response: ", response)

    return {
        type: GET_PROFILEIMG,
        payload: response
    }
}

export function getproperties(values) {
    console.log("getproperties =", values)
    const response = axios.get('/api/getProperty/', { params: values })

    return {
        type: GET_PROPERTIES,
        payload: response
    }
}

export const getprofile = (values) => {
    console.log("value", values)
    return (dispatch) => {
        axios.post('/api/getProfile/', values)
            //   .then(res => res.json())
            .then(response => {
                console.log("response", response)
                dispatch({
                    type: GET_PROFILE,
                    payload: response
                })
            })
    }
}

export async function updateprofile(values) {
    console.log("updateprofile  = ", values)
    axios.defaults.withCredentials = true;
    let response = await axios.post('/api/updateProfile', values)
    return {
        type: UPDATE_PROFILE,
        payload: response
    }
}

export async function uploadsinglephoto(values) {
    console.log("uploadsinglephoto = ", values)
    axios.defaults.withCredentials = true;
    let response = await axios.post('/uploadSingle', values.formData, values.config)

    return {
        type: UPLOAD_SNGLE_PHOTO,
        payload: response
    }
}

export function makebooking(values, callback) {
    axios.defaults.withCredentials = true;
    const response = axios.post('/api/setBooking/', values)
        .then(callback())

    return {
        type: MAKE_BOOKING,
        payload: response
    }
}

export function travelerdashboard(values) {
    axios.defaults.withCredentials = true;
    const response = axios.get('/api/getTravelerDashboard/', { params: values })

    return {
        type: TRAVELER_DASHBOARD,
        payload: response
    }
}

export async function insertnewproperty(values) {
    const currencyValMap = { 'US Dollar': '$', 'Canadian Dollar': 'CAD', 'Euros': '&euro;' }
    values.price = currencyValMap[values.pricetoggle] + ' ' + values.price
    console.log("inside insert property actions", values)

    const formData = new FormData();
    for (var i = 0; i < values.property_images.length; i++) {
        formData.append("property_images", values.property_images[i]);
    }
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    var response;
    axios.defaults.withCredentials = true;
    await axios.post('/api/insertProperty/', values)
        .then((response) => {
            console.log("Response of insert property: ", response.data.pid)
            formData.append("property_id", response.data.pid)
            console.log("uploading photos", formData)
            axios.post('/uploadMultiple', formData, config)
        })
        .then((resp) => setTimeout(() => {
            console.log("response from insert property: ", resp);
            response = resp;
        },
            3000
        ));
    return {
        type: INSERT_PROPERTY,
        payload: response
    }
}

export function ownerdashboard(values) {
    axios.defaults.withCredentials = true;
    const response = axios.get('/api/getOwnerDashboard/', { params: values })

    return {
        type: OWNER_DASHBOARD,
        payload: response
    }
}

export function allproperties(values) {
    axios.defaults.withCredentials = true;
    const response = axios.get('/api/getAllOwnerProperties/', { params: values })

    return {
        type: ALL_OWNER_PROPERTIES,
        payload: response
    }
}

export function updatebookingstatus(values) {
    axios.defaults.withCredentials = true;
    const response = axios.post('/api/updateBookingStatus/', values)

    return {
        type: UPDATE_BOOKING_STATUS,
        payload: response
    }
}

export function insertprofile(values, callback) {
    axios.defaults.withCredentials = true;
    const response = axios.post('/api/setProfile', values)
        .then((response) => {
            console.log("response: ", response)
            callback(response.data)
        });

    return {
        type: INSERT_PROFILE,
        payload: response
    }
}

export function gettravelermessages(values) {
    // axios.defaults.withCredentials = true;
    const response = axios.get('/api/getTravelerMessages', { params: values })
    // console.log("Response", response)

    return {
        type: GET_TRAVELER_MESSAGES,
        payload: response
    }
}

export function sendmessage(values) {
    axios.defaults.withCredentials = true;
    const response = axios.post('/api/sendMessages', values)

    return {
        type: SEND_MESSAGE,
        payload: response
    }
}

export function getownermessages(values) {
    // axios.defaults.withCredentials = true;
    const response = axios.get('/api/getOwnerMessages', { params: values })
    // console.log("Response", response)

    return {
        type: GET_OWNER_MESSAGES,
        payload: response
    }
}