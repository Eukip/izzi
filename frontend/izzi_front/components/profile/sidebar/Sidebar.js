import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchNetworks } from "../../../store/actions/contact";
import { useDispatch, useSelector } from "react-redux";
import { logOutAuth } from "../../../store/actions/userAuth";

const Sidebar = () => {
  const [tokenPartner, setTokenPartner] = useState("");
  const userAuth = useSelector(({ userAuthReducer: { data } }) => data);
  const [name, setName] = useState("");
  const [loginUser, setLoginUser] = useState("");

  const dispatch = useDispatch();

  const getOut = () => {
    dispatch(logOutAuth(localStorage.clear()));
    setTokenPartner("");
    setLoginUser("");
  };

  useEffect(() => {
      dispatch(fetchNetworks());
      const token = localStorage.getItem("access_token");
      setTokenPartner(token);
      setName(localStorage.getItem("first_name"));
  }, [userAuth]);

  return (
    <div className="about-us__left">
      <div className="about-us__left-inner">
        <ul className="about-us__links wrapper-for-main-icon">
          <li>
            <Link href={"/profile"}>
              <a className="personal-area">Профиль</a>
            </Link>
          </li>
          <li>
            <Link href={"/partner"}>
              <a className="partner">Страница партнера</a>
            </Link>
          </li>
          <li>
            <Link href={"/shares"}>
              <a className="promotions">Мои акции</a>
            </Link>
          </li>
          <li>
            <Link href={"/my-coupons"}>
              <a className="coupon">Мои купоны</a>
            </Link>
          </li>
          <li>
            <Link href={"/change-number"}>
              <a className="phone">Сменить номер</a>
            </Link>
          </li>
          <li>
            <Link href={"/change-password"}>
              <a className="password">Сменить пароль</a>
            </Link>
          </li>
          {tokenPartner ? (
              <Link href={"/"}>
                <li>
                  <a className="exit" onClick={getOut}>
                    Выйти из аккаунта
                  </a>
                </li>
              </Link>
          ) : <li>
            <a className="exit">
              Выйти из аккаунта
            </a>
          </li>}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
