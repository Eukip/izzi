import {
    GET_SEARCH_COUPON,
} from "../constants/constants";

const initialState = {
    items:{
        next:null,
        previous:null,
        count:null,
        results:[
            {}
        ]
    },
    isLoaded: false,
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
};

const searchBar = (state = initialState, action) => {
    switch (action.type) {
        case GET_SEARCH_COUPON:
            return {
                ...state,
                items: {
                    results: action.payload,
                },
                isLoaded: false,
            };
        case "SET_LOADED":
            return {
                ...state,
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};

export default searchBar;
