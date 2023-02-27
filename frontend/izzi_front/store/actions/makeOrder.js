import {GET_MAKE_ORDER} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getMakeOrder = (MakeOrderItems) => ({
    type: GET_MAKE_ORDER,
    payload: MakeOrderItems,
});

export const fetchMakeOrder = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/how-to-order/`)
            .then(({ data }) => {
                dispatch(getMakeOrder(data));
            });
    }catch (e) {
        console.log(e)
    }
};
