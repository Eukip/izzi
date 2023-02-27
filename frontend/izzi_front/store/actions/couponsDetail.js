import {GET_DETAILS_COUPONS, SET_COUPONS, SET_CURRENT_PAGE, SET_MY_COUPONS, SET_MY_STOCKS} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getDetailCoupons = (items) => ({
    type: GET_DETAILS_COUPONS,
    payload: items,
});


export const fetchDetailCoupons = (id) => (dispatch) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
    dispatch(setLoaded());

        izzi.get(`/coupons/${id}/`, localStorage.getItem('access_token') ? {headers} : {})
            .then(({data}) => {
                dispatch(getDetailCoupons(data));
                console.log(data)
            }).catch(err => console.log(err.response.data))
};




