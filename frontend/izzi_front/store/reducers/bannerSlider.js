import {GET_BANNER_SLIDER} from '../constants/constants'

const initialState = {
    items: [],
    isLoaded: false
};
const bannerSlider = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANNER_SLIDER:
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

export default bannerSlider;
