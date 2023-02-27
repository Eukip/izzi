import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
    type: "SET_LOADED",
    payload,
});

export const getCompany = (items) => ({
    type: "GET_COMPANY",
    payload: items,
});

export const fetchCompany = (id) => (dispatch) => {
    dispatch(setLoaded());
    try {
        izzi.get(`/company/${id}`)
            .then(({data}) => {
                dispatch(getCompany(data));
            });

    } catch (e) {
        console.log(e)
    }
};
