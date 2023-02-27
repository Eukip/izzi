
const initialState = {
    qrCodeCheck: false
};
const checkOrderQrCode = (state = initialState, action) =>  {
    switch (action.type){
        case "GET_QR_CODE_BOOLEAN" : {
            return {
                qrCodeCheck: action.payload
            }
        }
        default:
            return state
    }
}
export default checkOrderQrCode;