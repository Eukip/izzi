import React from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {fetchDetailCoupons} from "../../../store/actions/couponsDetail";
import {
  AddCouponsToFavorite,
  removeCouponFromFavorite,
} from "../../../store/actions/favorite";
import styles from './styles.module.scss'
import classNames from "classnames";

const CouponsItem = (
  {
    id = 0,
    discount_percent = 0,
    preview_image = "",
    company_logo = "",
    company_name = "",
    price = "",
    title = "",
    old_price = "",
    is_favorite = "",
    price_for_coupon = "",
  }) => {
  const [active, setActive] = React.useState(true);
  const favorites = useSelector(({ favorite: { items } }) => items) || [];
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    if (token) {
      setActive(!!is_favorite);
    } else {
      const data = JSON.parse(localStorage.getItem("favorite")) || [];
      setActive(data.some(el => el.id === id));
    }
  }, [is_favorite]);

  React.useEffect(() => {
    const tokenFromStorage = localStorage.getItem('access_token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  const onAddCoupon = (id) => {
    if (token) {
      if (!active && !favorites.some(el => el.id === id)) {
        dispatch(AddCouponsToFavorite(id));
      } else {
        dispatch(removeCouponFromFavorite(id));
      }
      setActive(!active);
      return;
    }

    const obj = {
      id,
      discount_percent,
      preview_image,
      company_logo,
      company_name,
      price,
      title,
      old_price,
      price_for_coupon,
    };

    const favoritesArr = JSON.parse(localStorage.getItem("favorite")) || [];
    if (!active) {
      if (favoritesArr.some(element => element.id === id)) {
        const filtered = favoritesArr.filter(item => item.id !== id);
        localStorage.setItem('favorite', JSON.stringify(filtered));
        setActive(false);
        return;
      }
      favoritesArr.push(obj);
      setActive(true);
      localStorage.setItem("favorite", JSON.stringify(favoritesArr));

    } else {
      const filteredArr = favoritesArr.filter(element => element.id !== obj.id);
      setActive(false);
      localStorage.setItem("favorite", JSON.stringify(filteredArr));
    }
  };

  const dispatch = useDispatch();

  const onFetchDetailsCoupons = (id) => {
    dispatch(fetchDetailCoupons(id));
  };

  const heartClassnames = React.useCallback(() => classNames({
    'coupons-favorite': true,
    'active': active || token && favorites.some(el => el.id === id),
  }), [active, token, favorites]);

  return (
    <div className="coupons-item">
      <Link href={`/coupons/${id}`}>
        <a className="coupons-link" onClick={() => onFetchDetailsCoupons(id)}/>
      </Link>
      <div className="coupons-discount">{discount_percent} %</div>
      <div
        className={heartClassnames()}
        onClick={() => onAddCoupon(id)}
      />
      <div className="coupons-image">
        <img src={preview_image} alt=""/>
      </div>
      <div className="coupons-info">
        <div className="coupons-store">
          <div className="coupons-store-logo">
            <img src={company_logo} alt=""/>
          </div>
          <div className="coupons-store-title">{company_name}</div>
        </div>
        <div className="coupons-desc">
          <p>{title.length > 30 ? title.slice(0, 30) + "..." : title}</p>
        </div>
        <div className={styles.priceContainer}>
          <div>
            <img src="/svg/hot-sale-light.svg" alt=""/>
          </div>
          <div className={styles.priceInfo}>
            <div className={styles.label}>
              <span>Цена скидки с купоном:</span>
            </div>
            <div className={styles.prices}>
              <p className={styles.newPrice}>{price}</p>
              <p className={styles.oldPrice}>{old_price}</p>
            </div>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <div>
            <img src="/svg/dollar.svg" alt=""/>
          </div>
          <div className={styles.priceInfo}>
            <div className={styles.label}>
              <span>Цена за купон:</span>
            </div>
            <div className={styles.prices}>
              <p className={styles.newPrice}>{price_for_coupon ?? "..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponsItem;
