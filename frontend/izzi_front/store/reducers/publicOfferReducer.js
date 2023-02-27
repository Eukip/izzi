import {GET_PUBLIC_OFFER} from "../constants/constants";

const initialState = {
    publicOfferItems: [],
    isLoading: false,
};

const PublicOffer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PUBLIC_OFFER:
            return {
                ...state,
                publicOfferItems: action.payload,
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
