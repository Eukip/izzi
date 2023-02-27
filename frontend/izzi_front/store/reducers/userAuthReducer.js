import {USER_AUTH_REQUEST, USER_LOGOUT, USER_AUTH_FAILURE, USER_AUTH_SUCCESS} from "../constants/constants";

const INITIAL_STATE = {
    loading: false,
    data: {
        data:{
            access: ""
        }
    }
};

const userAuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_AUTH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_AUTH_SUCCESS:
            return {
                loading: false,
                data: action.payload.data,
                error: ''
            }
        case USER_AUTH_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                // data:action.payload
            }
        default:
            return state
    }

};

export default userAuthReducer;
