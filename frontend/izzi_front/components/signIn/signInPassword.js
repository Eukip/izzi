import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  userAuth,
  userAuthFailure,
  userAuthSuccess,
} from "../../store/actions/userAuth";

const SignInPassword = ({
  phone,
  signState,
  showPassword,
  password,
  setPassword,
  setCurrentPage,
  handleSignInState,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const data = useSelector(({ userAuthReducer }) => userAuthReducer);

  const authHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(userAuth(phone, password, router));
  };

  useEffect(() => {
    if (data?.error?.response?.data?.detail) {
      handleSignInState("loginError", true);
    }
  }, [data]);
  return (
    <main className="change__phone-number background-grey">
      <div className="registration-content">
        <h1 className="title-section"> Войдите, чтобы продолжить</h1>
        <div className="change-num-sand-code__wrapper">
          <div className="change-num__info">
            <div className="phone-number">{`+${phone}`}</div>
          </div>
          <form className="change-number" onSubmit={(e) => authHandler(e)}>
            <small className={signState.loginError ? "error" : "hide"}>
              Неверно введен пароль
            </small>
            <label className="partner-input password">
              <div
                onClick={() => handleSignInState("showPassword", true)}
                className={
                  signState.showPassword
                    ? "hide-show__password show"
                    : "hide-show__password"
                }
              ></div>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
              />
            </label>
            <button
              className="partners-submit"
              type="submit"
              disabled={!!password.trim() ? false : true}
            >
              Войти
            </button>
            <button
              onClick={() => setCurrentPage("signInPhone")}
              className="partners-submit"
            >
              Назад
            </button>
            <Link href={"recovery-password"}>
              <a className="registration-but">Не помню пароль</a>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInPassword;
