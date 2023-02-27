import {GET_NETWORKS} from '../constants/constants'

const initialState = {
    itemsPhone: [],
    isLoaded: false,
};

const contacts = (state = initialState, action) => {
    switch (action.type) {
        case GET_NETWORKS:
            return {
                ...state,
                itemsPhone: action.payload,
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

export default contacts;
