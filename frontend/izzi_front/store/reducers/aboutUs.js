import {GET_ABOUT_US} from '../constants/constants'

const initialState = {
    items: [],
    isLoaded: false,
};

const aboutUs = (state = initialState, action) => {
    switch (action.type) {
        case GET_ABOUT_US:
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

export default aboutUs;
