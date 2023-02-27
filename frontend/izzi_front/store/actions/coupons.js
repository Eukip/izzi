import {
  SET_COUPONS,
  SET_CURRENT_PAGE,
  SET_MY_COUPONS,
  SET_MY_STOCKS,
  SET_LOADED,
  GET_COUPONS_CATEGORY_REQUEST, GET_COUPONS_CATEGORY_SUCCESS, GET_COUPONS_CATEGORY_FAILURE, COUPONS_PAGINATION
} from '../constants/constants'
import izzi from "../../adapters/axios.config";

export const setLoaded = (payload) => ({
  type: SET_LOADED,
  payload,
});

export const setCoupons = (items) => ({
  type: SET_COUPONS,
  payload: items,
});


export const setMoreCoupons = (items) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: items
  }
}

export const setMyCoupons = (payload) => ({
  type: SET_MY_COUPONS,
  payload,
});

export const setMyStocks = (payload) => ({
  type: SET_MY_STOCKS,
  payload,
});


export const fetchMoreCoupons = (options) => {
  return (dispatch) => {
    izzi.get(`/coupons/?page=${options.currentPage}`)
      .then(({data}) => {
        dispatch(setMoreCoupons(data));
      })
  }
}

export const fetchCoupons = (id) => (dispatch) => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
  dispatch(setLoaded());

  try {
    izzi.get(`/coupons/category/${id ?? 1}`,
      localStorage.getItem('access_token') !== null ? {headers} : null)
      .then(({data}) => {
        dispatch(setCoupons(data));
      });
  } catch (e) {
  }
};

export const fetchAllCoupons = () => async (dispatch) => {
  dispatch(setLoaded());
  const token = localStorage.getItem('access_token')
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  try {
    const response = await izzi.get(`/coupons/`, token ? {headers} : null)
    dispatch(setCoupons({...response.data, results: [...response.data.results]}));
  } catch (e) {
  }
};

// My Coupons
export const fetchMyCouponsActive = (arg) => (dispatch) => {
  let token;
  if (typeof window !== undefined) {
    token = localStorage.getItem('access_token') || ""
  }
  dispatch(setLoaded());

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  try {
    izzi.get(`/coupons/me/?status=${arg}`, {headers}).then(({data}) => {
      dispatch(setMyCoupons(data));
    })
  } catch (e) {
  }
};
//sortby
export const fetchSortBy = (arg) => (dispatch) => {
  dispatch(setLoaded());

  try {
    izzi.get(`/coupons/?sort_by=${arg}`,)
      .then(({data}) => {
        dispatch(setCoupons(data));
      })
  } catch (e) {
    console.log(e)
  }
};

export const fetchSortByCategory = (arg) => (dispatch) => {
  dispatch(setLoaded());

  try {
    izzi.get(`/coupons/category/${arg.id}/?sort_by=${arg.title}`,)
      .then(({data}) => {
        dispatch(setCoupons(data));
      })
  } catch (e) {
    console.log(e)
  }
};

export const setMoreCouponsMe = (items) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: items
  }
}

export const fetchMoreCouponsMe = (options) => {
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
  return (dispatch) => {
    izzi.get(`/coupons/me/?page=${options.currentPage}&status=${options.arg}`, {headers})
      .then(({data}) => {
        dispatch(setMoreCouponsMe(data));
      })
  }
}


export const fetchMyStocks = (arg) => (dispatch) => {
  dispatch(setLoaded());
  const headers = {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
  try {
    izzi.get(`/coupons/my-stocks/?status=${arg}
        `, {headers})
      .then(({data}) => {
        dispatch(setMyStocks(data));
      })
  } catch (e) {
  }
};

export const fetchCouponsByCategory = ({id, category, page: page = 1}) => async dispatch => {
  dispatch({type: GET_COUPONS_CATEGORY_REQUEST})
  try {
    const response = await izzi.get(`/coupons/${category}/${id}/`)
    dispatch({type: GET_COUPONS_CATEGORY_SUCCESS, payload: response.data})
  } catch (e) {
    dispatch({type: GET_COUPONS_CATEGORY_FAILURE, payload: e})
  }
}

export const couponsPagination = (id, category, page = 1) => async dispatch =>{
  try {
    const res = await izzi.get(`/coupons/${category}/${id}`, {
      params: { page }
    });
    dispatch({ type: COUPONS_PAGINATION, payload: res.data });
  } catch (error) {
    dispatch({ type: COUPONS_PAGINATION, payload: [] });
  }
}

export const fetchTrendCoupons = () => async dispatch => {
  dispatch(setLoaded());
  try {
    const response = await izzi.get("/coupons/trends/")
    dispatch(setCoupons(response.data))
  } catch (e) {

  }
}
