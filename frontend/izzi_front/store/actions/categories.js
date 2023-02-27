import izzi from "../../adapters/axios.config";
import {GET_CATEGORIES_FAILURE, GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS} from "../constants/constants";

export const getCategories = () => async dispatch => {
    dispatch({type: GET_CATEGORIES_REQUEST})
    try {
        const response = await izzi.get("/categories/")
        dispatch({type: GET_CATEGORIES_SUCCESS, payload: response.data})
    } catch (e) {
        dispatch({type: GET_CATEGORIES_FAILURE, payload: e})
    }


}