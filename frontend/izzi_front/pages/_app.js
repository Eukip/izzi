import React from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {createWrapper} from "next-redux-wrapper";
import store from "../store/store";
import "../styles/globals.scss"
import {AddCouponsToFavorite, GetFavoriteCoupons, GetFavoriteCouponsFromLocalStorage} from "../store/actions/favorite";

function Application({ Component, pageProps }) {
  const dispatch = useDispatch();
  const userData = useSelector(({userAuthReducer: {data}}) => data);
  const { items: favorite, isLoaded } =  useSelector(({ favorite: { items, isLoaded } }) =>
    ({isLoaded, items})) || [];

  const synchronizeFavorites = async () => {
    if (userData?.access || localStorage.getItem('access_token')) {
      await dispatch(GetFavoriteCoupons());
    } else {
      dispatch(GetFavoriteCouponsFromLocalStorage());
      return;
    }
    const favoritesStorage = JSON.parse(localStorage.getItem('favorite')) || [];
    if (favoritesStorage.length && isLoaded) {
      Promise.all(favoritesStorage.map(fav => {
        if (!favorite?.some(el => el.id === fav.id)) {
          return dispatch(AddCouponsToFavorite(fav.id));
        }
      }))
        .then(() => {
          localStorage.removeItem('favorite');
          dispatch(GetFavoriteCoupons());
        })
    }
  }

  React.useEffect(() => {
    synchronizeFavorites();
  }, [userData, userData?.access]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(Application);
