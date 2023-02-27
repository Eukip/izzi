import {GET_REQUISITES} from "../constants/constants";

const initialState = {
    requisitesItems: [],
    isLoading: false,
};

const PublicOffer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REQUISITES:
            return {
                ...state,
                requisitesItems: action.payload,
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

export default PublicOffer;
