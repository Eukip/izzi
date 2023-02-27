import {GET_PAYMENT_WAYS} from '../constants/constants'

const initialState = {
    PaymentItems: [],
    isLoading: false,
};

const paymentWays = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT_WAYS:
            return {
                ...state,
                PaymentItems: action.payload,
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

export default paymentWays;
