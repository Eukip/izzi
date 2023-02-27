const initialState = {
    qrCode: null,
};

const qrCode = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_QR_CODE': {
            return{
                ...state,
                qrCode: action.payload,
            }
        }
        default:
            return state;
    }
};

export default qrCode;