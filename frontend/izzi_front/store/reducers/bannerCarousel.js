import {GET_BANNER_CAROUSEL} from '../constants/constants'

const initialState = {
    items: [],
    isLoaded: false
};
const bannerCarousel = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANNER_CAROUSEL:
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
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

export default bannerCarousel;
