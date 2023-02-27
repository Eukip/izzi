import {
    GET_CATEGORIES_FAILURE,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    SET_CATEGORY,
    SET_SUB_CATEGORY
} from '../constants/constants'
import defaultState from "./defaultState";

const initialState = defaultState


const categories = (state = initialState, action) => {
   switch (action.type){
       case GET_CATEGORIES_REQUEST:
           return{
               ...state,
               loading: true
           }
       case GET_CATEGORIES_SUCCESS:
           return{
               loading: false,
               data: action.payload,
               failure: null,
           }
       case GET_CATEGORIES_FAILURE:
           return{
               loading: false,
               data: null,
               failure: action.payload,
           }
       default:
           return state
   }
}

export default categories