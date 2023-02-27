import izzi from "../../adapters/axios.config";

export const getQrCodeDis = (payload) => ({
    type: 'GET_QR_CODE',
    payload,
})

export const getQrCode = (id) => (dispatch) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    };
    try {
        izzi.get(`/coupons/qr-code/${id}/`,{headers} )
            .then((res) => {
                dispatch(getQrCodeDis(res.data))
            })
    } catch (e) {
        console.log(e)
    }
};
