import {GET_BANNER_CAROUSEL} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchBannerCarousel = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/image-block/`)
            .then(({ data }) => {
                dispatch(getBannerCarosel(data));
            });
    }catch (e) {
        console.log(e)
    }
};

export const getBannerCarosel = (items) => ({
    type: GET_BANNER_CAROUSEL,
    payload: items,
});
