import {GET_DETAILS_COUPONS} from "../constants/constants";


const initialState = {
   items: [],
    isLoaded: false,
};

const couponsDetail = (state = initialState, action) => {
    switch (action.type) {
        case GET_DETAILS_COUPONS:
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            };
        case "SET_LOADED":
            return {
                ...state,
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};

export default couponsDetail;
