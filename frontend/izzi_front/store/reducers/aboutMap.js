import {GET_ABOUT_MAP} from '../constants/constants'

const initialState = {
    mapItems: [],
    isLoading: false,
};

const aboutMap = (state = initialState, action) => {
    switch (action.type) {
        case GET_ABOUT_MAP:
            return {
                ...state,
                mapItems: action.payload,
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

export default aboutMap;
