import izzi from "../../adapters/axios.config";
import {GET_PRIVACY_POLICY} from "../constants/constants";

export const setLoading = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getPrivacyPolicy = (privacyItems) => ({
    type: GET_PRIVACY_POLICY,
    payload: privacyItems,
});

export const fetchPrivacyPolicy = () => (dispatch) => {
    dispatch(setLoading());
    try {
        izzi
            .get(`/info/privacy-policy/`)
            .then(({ data }) => {
                dispatch(getPrivacyPolicy(data));
            });
    }catch (e) {
        console.log(e)
    }
};

