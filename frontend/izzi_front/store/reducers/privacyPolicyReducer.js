import {GET_PRIVACY_POLICY} from "../constants/constants";

const initialState = {
    privacyItems: [],
    isLoading: false,
};

const privacyPolicy = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRIVACY_POLICY:
            return {
                ...state,
                privacyItems: action.payload,
                isLoading: true,
            };
        case "SET_LOADED":
            return {
                ...state,
                isLoading: action.payload,
            };

        default:
            return state;
    }
};

export default privacyPolicy ;
