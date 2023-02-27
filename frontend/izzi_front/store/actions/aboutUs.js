import {GET_ABOUT_US} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchAboutUs = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/about-us/`)
            .then(({ data }) => {
                dispatch(getAboutUS(data));
            });
    }catch (e) {
        console.log(e)
    }
};

export const getAboutUS = (items) => ({
    type: GET_ABOUT_US,
    payload: items,
});
