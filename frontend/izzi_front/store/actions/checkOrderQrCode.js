import izzi from "../../adapters/axios.config";

export const getQrCodeBoolean = (payload) => ({
    type: 'GET_QR_CODE_BOOLEAN',
    payload,
})

export const fetchCheckOrderQrCode = (id) => (dispatch) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    };
    izzi.get(`/coupons/check-order/${id}`,{headers})
        .then(res => {
            dispatch(getQrCodeBoolean(res.data))
        }).catch(error => console.log(error))
};
