import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Link from "next/link";
import axios from "axios";
import izzi from "../../../adapters/axios.config";
import ModalWindowChangePassword from "./ModalWindowChangePassword";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [new_password_repeat, setNew_password_repeat] = useState("");
  const [modalWindow, setModalWindow] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [formEmpty, setFormEmpty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [threePasswordError, setThreePasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const url = "/users/change-password/";

  const arr = [old_password, new_password, new_password_repeat];
  const hasEmptyFields = arr.filter((item) => !!item).length !== 0;

  const data = {
    old_password,
    new_password,
    new_password_repeat,
  };
  const sendRequest = (e) => {
    e.preventDefault();
    if (
      !new_password.replace(/\s/g, "") ||
      !old_password.replace(/\s/g, "") ||
      !new_password_repeat.replace(/\s/g, "") ||
      !new_password.length ||
      !old_password.length ||
      !new_password_repeat.length
    ) {
      setThreePasswordError("Поля не должны быть пустыми");
    } else if (
      new_password === old_password &&
      new_password_repeat === old_password
    ) {
      setThreePasswordError("Старый и новый пароли не должны совпадать");
      setPasswordError(false);
      setNewPasswordError(false);
    } else if (new_password !== new_password_repeat) {
      setPasswordError("Пароли не совпадают");
      setThreePasswordError(false);
      setNewPasswordError(false);
    } else {
      setPasswordError(false);
      setThreePasswordError(true);
      setOldPasswordError(true);
      setNewPasswordError(false);
      izzi
        .patch(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          setModalWindow("Пароль успешно изменен");
        })
        .catch((error) => {
          if (error.response) {
            setOldPasswordError("неверный текущий пароль");
          }
        });
    }
  };

  useEffect(() => {
    if (old_password || new_password || new_password_repeat) {
      setFormEmpty(false);
    } else setFormEmpty(true);
  }, [old_password || new_password || new_password_repeat]);

  return (
    <main className="change__password background-grey">
      <div className="crumb">
        <div className="container">
          <div className="crumb-list">
            <Link href="/">
              <a className="crumb-item">Главная</a>
            </Link>
            <span className="crumb-item">Сменить пароль</span>
          </div>
        </div>
      </div>
      <div className="about-us__wrapper">
        <div className="container">
          <div className="about-us__content">
            <Sidebar />
            <div className="about-us__right">
              <div className="about-us__right-inner change-num__content">
                <div className="my-coupon__content">
                  <h1 className="title-box"> Сменить пароль</h1>
                  <div className="change-num__wrapper">
                    <small style={{ color: "red" }}>{threePasswordError}</small>
                    <form
                      className="change-number"
                      onSubmit={(e) => sendRequest(e)}
                    >
                      <small style={{ color: "green" }}>
                        {oldPasswordError}
                      </small>
                      <label className="partner-input">
                        <input
                          type="text"
                          placeholder="Текущий пароль"
                          name="old_password"
                          onChange={(e) => setOld_password(e.target.value)}
                        />
                      </label>
                      <small style={{ color: "red" }}>{passwordError}</small>
                      <label className="partner-input password">
                        <div
                          onClick={() => setShowPassword(!showPassword)}
                          className={
                            showPassword
                              ? "hide-show__password show"
                              : "hide-show__password"
                          }
                        ></div>
                        <small style={{ color: "red" }}>
                          {newPasswordError}
                        </small>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Придумайте пароль"
                          name="new_password"
                          onChange={(e) => setNew_password(e.target.value)}
                        />
                      </label>
                      <label className="partner-input password">
                        <div
                          onClick={() => setShowPasswordTwo(!showPasswordTwo)}
                          className={
                            showPasswordTwo
                              ? "hide-show__password show"
                              : "hide-show__password"
                          }
                        ></div>
                        <small style={{ color: "red" }}>
                          {newPasswordError}
                        </small>
                        <input
                          type={showPasswordTwo ? "text" : "password"}
                          placeholder="Повторите пароль"
                          name="new_password_repeat"
                          onChange={(e) =>
                            setNew_password_repeat(e.target.value)
                          }
                        />
                      </label>
                      <div className="error-msg"></div>
                      <button
                        className="partners-submit"
                        type="submit"
                        disabled={formEmpty}
                      >
                        Сохранить
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-container" id="modal">
        <div id={modalWindow ? "myModal" : "hide"} className="modal_window">
          <div className="modal-success">
            <div className="modal-success__inner">
              <div className="img">
                <img src="/svg/PartnerBid.svg" />
              </div>
              <div className="text">{modalWindow}</div>
              <Link href={"/"}>
                <a className="partners-submit">На главную</a>
              </Link>
            </div>
          </div>
        </div>
        <a href="#" className="modal-overlay"></a>
      </div>
    </main>
  );
};

export default ChangePassword;
