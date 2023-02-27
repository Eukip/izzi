

const initialState = {
    items: []
};

const couponsDetail = (state = initialState, action) => {
    switch (action.type) {
        case "GET_COMPANY":
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

export default couponsDetail;
