import {GET_BANNER_SLIDER} from '../constants/constants'
import izzi from "../../adapters/axios.config";

const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

const getBannerSlider = (items) => ({
    type: GET_BANNER_SLIDER,
    payload: items,
});


export const fetchBannerSlider = () => (dispatch) => {
    dispatch(setLoaded({isLoaded: true}));

    try {
        izzi
            .get(`/info/image-slider/`)
            .then(({ data }) => {
                dispatch(getBannerSlider(data));
            });
    }catch (e) {
        console.log(e)
    }
};
