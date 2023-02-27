import {GET_HELP_ANSWERS} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const fetchHelpAnswers = () => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi
            .get(`/info/faq/`)
            .then(({ data }) => {
                dispatch(getHelpAnswers(data));
            });
    }catch (e) {
        console.log(e)
    }
};

export const getHelpAnswers = (items) => ({
    type: GET_HELP_ANSWERS,
    payload: items,
});
