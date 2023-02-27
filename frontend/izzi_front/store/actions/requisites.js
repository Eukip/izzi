import izzi from "../../adapters/axios.config";
import {GET_REQUISITES} from "../constants/constants";

export const setLoading = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getRequisites = (requisitesItems) => ({
    type: GET_REQUISITES,
    payload: requisitesItems,
});


export const fetchRequisites= () => (dispatch) => {
    dispatch(setLoading());
    try {
        izzi
            .get(`/info/requisites/`)
            .then(({ data }) => {
                dispatch(getRequisites(data));
            });
    }catch (e) {
        console.log(e)
    }
};
