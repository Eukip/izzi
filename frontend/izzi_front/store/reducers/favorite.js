import {ADD_COUPON_TO_FAVORITE,REMOVE_COUPON_TO_FAVORITE} from "../constants/constants";

const initialState = {
    items: [],
    isLoaded: false,
};

const favorite = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_FAVORITE_COUPONS': {
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            }
        }
        case ADD_COUPON_TO_FAVORITE: {
            const newItems = [
                ...state.items
            ]
            return {
                ...state,
                items: newItems,
            };
        }
        case REMOVE_COUPON_TO_FAVORITE: {
            const newItems = [
                ...state.items.filter(el => el.id !== action.payload),
            ];
            return {
                ...state,
                items: newItems,
            };
        }

        default:
            return state;
    }
};

export default favorite;
