import izzi from "../../adapters/axios.config";
import {GET_ABOUT_MAP} from "../constants/constants";
export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchAboutMap = () => (dispatch) => {
    dispatch(setLoaded());

    izzi.get(`/info/our-map-coordinates/`)
        .then(({ data }) => {
            dispatch(getAboutMap(data));
        });
};

export const getAboutMap = (mapItems) => ({
    type: "GET_ABOUT_MAP",
    payload: mapItems,
});
