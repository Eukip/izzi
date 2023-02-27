import izzi from "../../adapters/axios.config";
import {GET_PUBLIC_OFFER} from "../constants/constants";

export const setLoading = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getPublicOffer = (publicOfferItems) => ({
    type: GET_PUBLIC_OFFER,
    payload: publicOfferItems,
});


export const fetchPublicOffer = () => (dispatch) => {
    dispatch(setLoading());
    try {
        izzi
            .get(`/info/public-offer/`)
            .then(({ data }) => {
                dispatch(getPublicOffer(data));
            });
    }catch (e) {
        console.log(e)
    }
};
