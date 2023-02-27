import {USER_AUTH_FAILURE, USER_AUTH_REQUEST, USER_AUTH_SUCCESS, USER_LOGOUT} from "../constants/constants";
import izzi from "../../adapters/axios.config";

export const userAuthRequest = () => {
    return {
        type: USER_AUTH_REQUEST
    }
}

export const userAuthSuccess = data => {
    return {
        type: USER_AUTH_SUCCESS,
        headers: data.headers,
        payload: data
    }
}

export const userAuthFailure = error => {
    return {
        type: USER_AUTH_FAILURE,
        payload: error
    }
}
export const logOutAuth = () => {
    return {
        type: USER_LOGOUT,
        payload: {}
    }
}
export const userAuth = (phone, password, router) => {
    return (dispatch) => {
        dispatch(userAuthRequest())
        izzi.post("/users/login/", {
            "phone": "+" + phone,
            "password": password,
        })
            .then((res) => {
                if (typeof window !== "undefined") {
                    localStorage.setItem("access_token", res.data.access);
                    localStorage.setItem("first_name", res.data.first_name);
                }
                router.push("/")
                dispatch(userAuthSuccess(res))
            })
            .catch((error) => {
                console.log(error);
                dispatch(userAuthFailure(error))
            });
    }
};
export default userAuth()
