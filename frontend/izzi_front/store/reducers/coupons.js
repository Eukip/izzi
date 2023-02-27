import {
    SET_COUPONS,
    SET_CURRENT_PAGE,
    GET_MY_COUPONS_ACTIVE,
    SET_MY_STOCKS,
    SET_MY_COUPONS,
    GET_COUPONS_CATEGORY_REQUEST,
    GET_COUPONS_CATEGORY_SUCCESS,
    GET_COUPONS_CATEGORY_FAILURE,
    COUPONS_PAGINATION
} from '../constants/constants'

const initialState = {
    items:{
        next:null,
        previous:null,
        count:null,
        currentPage: 1,
        results:[],
        loading: false
    },
    isLoaded: false,
    currentPage: 1,
    perPage: 10,
    totalCount: 0,
    failure: null,
};

const coupons = (state = initialState, action) => {
    switch (action.type) {
        case SET_COUPONS:
            return {
                ...state,
                items: action.payload,
                currentPage: 1,
                totalCount: action.payload.totalCount,
                isLoaded: true,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                items: {
                    ...state.items,
                    results: [...state.items.results, ...action.payload.results],
                },
                currentPage: state.currentPage + 1,
                isLoaded: true,
            };
        case GET_MY_COUPONS_ACTIVE:
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            };
        case SET_MY_COUPONS:
            return {
                ...state,
                currentPage: 1,
                items: action.payload,
                isLoaded: true,
            };
        case SET_MY_STOCKS:
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            };
        case GET_COUPONS_CATEGORY_REQUEST:
            return{
                ...state,
                isLoaded: false,
            }
        case GET_COUPONS_CATEGORY_SUCCESS:
            return{
                ...state,
                isLoaded: true,
                items: action.payload,
            }
        case GET_COUPONS_CATEGORY_FAILURE:
            return{
                ...state,
                isLoaded: true,
                failure: action.payload,
            }
        case COUPONS_PAGINATION:
            return {
                ...state,
                isLoaded: true,
                items: {
                    ...action.payload,
                    results: [...state.items.results, ...action.payload?.results],
                },
            }
        default:
            return state;
    }
};

export default coupons;
