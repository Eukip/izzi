import {GET_MAKE_ORDER} from '../constants/constants'

const initialState = {
    MakeOrderItems: [],
    isLoading: false,
};

const makeOrder = (state = initialState, action) => {
    switch (action.type) {
        case GET_MAKE_ORDER:
            return {
                ...state,
                MakeOrderItems: action.payload,
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

export default makeOrder;
