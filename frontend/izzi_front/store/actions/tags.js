import {
    GET_TAGS_SUCCESS,
    GET_TAGS_REQUEST,
    GET_TAGS_FAILURE
} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const getTags = () => async dispatch => {
    dispatch({type: GET_TAGS_REQUEST})
    try {
        const response = await izzi.get("/tags/")
        dispatch({type: GET_TAGS_SUCCESS, payload: response.data})
    } catch (e) {
        dispatch({type: GET_TAGS_FAILURE, payload: e})
    }
}