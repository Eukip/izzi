import {GET_TAGS_SUCCESS, GET_TAGS_FAILURE, GET_TAGS_REQUEST} from '../constants/constants'
import defaultState from "./defaultState";

const initialState = defaultState

const tags = (state = initialState, action) => {
    switch (action.type) {
        case GET_TAGS_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case GET_TAGS_SUCCESS:
            return{
                ...state,
                loading: false,
                data: action.payload,
            }
        case GET_TAGS_FAILURE:
            return{
                ...state,
                loading: false,
                failure: action.payload,
            }
        default:
            return state;
    }
};

export default tags;
