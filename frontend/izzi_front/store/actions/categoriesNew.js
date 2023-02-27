import izzi from "../../adapters/axios.config";
import {GET_NEW_CATEGORIES} from "../constants/constants";


export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getCategoriesNew = (categoriesItem) => ({
    type: GET_NEW_CATEGORIES,
    payload: categoriesItem,
});

export const fetchCategoriesNew = () => dispatch => {

    dispatch(setLoaded)
        izzi
            .get(`/categories/`)
            .then(({ data }) => {
                dispatch(getCategoriesNew(data));
            })
            .catch((error) => console.log(error))
};
