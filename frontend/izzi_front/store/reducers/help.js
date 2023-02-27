import {GET_HELP_ANSWERS} from '../constants/constants'

const initialState = {
    items: [],
    isLoaded: false,
};

const helpAnswers = (state = initialState, action) => {
    switch (action.type) {
        case GET_HELP_ANSWERS:
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

export default helpAnswers ;
