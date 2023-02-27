import {GET_NETWORKS} from '../constants/constants'
import izzi from "../../adapters/axios.config";
export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});
export const getNetworks = (itemsPhone) => ({
    type: GET_NETWORKS,
    payload: itemsPhone,
});
export const fetchNetworks = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/networks/`)
            .then(({ data }) => {
                dispatch(getNetworks(data));
            });
    }catch (e) {
        console.log(e)
    }
};

