import {GET_SEARCH_COUPON} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getSearchBar = (items) => ({
    type: GET_SEARCH_COUPON,
    payload: items,
});


export const fetchSearchBar = (search) => (dispatch) => {
    dispatch(setLoaded());
    izzi
        .get(
            `/coupons/search/`,
            {
                params: {
                    search
                }
            }
        )
        .then(({ data: {results} }) => dispatch(getSearchBar(results)))
        .catch(e => console.log('ERROR', e));
};

