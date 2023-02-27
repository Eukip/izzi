import { REMOVE_COUPON_TO_FAVORITE, ADD_COUPON_TO_FAVORITE } from "../constants/constants";
import { setLoaded } from "./coupons";
import izzi from "../../adapters/axios.config";

const addCouponToFavorite = (obj) => ({
  type: ADD_COUPON_TO_FAVORITE,
  payload: obj,
});
//
const removeCouponToFavorite = (obj) => ({
  type: REMOVE_COUPON_TO_FAVORITE,
  payload: obj,
});

export const getFavoriteCouponsAction = (payload) => ({
  type: 'GET_FAVORITE_COUPONS',
  payload,
})

export const GetFavoriteCouponsFromLocalStorage = () => (dispatch) => {
  dispatch(setLoaded(true));
  try {
    const data = JSON.parse(localStorage.getItem('favorite'));
    dispatch(getFavoriteCouponsAction(data));
  } catch (e) {
    console.log(e)
  }
};

export const GetFavoriteCoupons = () => async (dispatch) => {
  dispatch(setLoaded(true));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  };
  try {
    const res = await izzi.get(`/users/favourite-coupons/`, {headers: headers});
    dispatch(getFavoriteCouponsAction(res.data));
  } catch (e) {
    console.log(e)
  }
};

export const AddCouponsToFavorite = (id) => (dispatch) => {
  try {
    izzi.post(`/users/favourite-coupons/?coupon_id=${id}`, null,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }
    )
      .then(dispatch(addCouponToFavorite(id)))
  } catch (e) {
    console.log(e)
  }
};

export const removeCouponFromFavorite = (id) => (dispatch) => {
  try {
    izzi.delete(`/users/favourite-coupons/?coupon_id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      },

    })
      .then(() => {
        dispatch(removeCouponToFavorite(id));
      })
      .finally(() => {
        dispatch(GetFavoriteCoupons());
      })
  } catch (e) {
    console.log(e)
  }
};
