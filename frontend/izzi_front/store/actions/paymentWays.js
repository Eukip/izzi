import {GET_PAYMENT_WAYS} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getPaymentWays = (PaymentItems) => ({
    type: GET_PAYMENT_WAYS,
    payload: PaymentItems,
});

export const fetchPaymentWays = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/payment-method/`)
            .then(({ data }) => {
                dispatch(getPaymentWays(data));
            });
    }catch (e) {
        console.log(e)
    }
};
