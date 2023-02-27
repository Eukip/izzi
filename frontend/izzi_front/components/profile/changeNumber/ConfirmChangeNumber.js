import React, { useState } from "react";
import izzi from "../../../adapters/axios.config";
import Link from "next/link";
import Sidebar from "../sidebar/Sidebar";
import styles from "/styles/changeNumber/changeNumber.module.scss";
import ChangeNumberModalWindow from "./ChangeNubmerModalWindow";

const ConfirmChangeNumber = ({ phone, setCurrentForm, sendPhoneRequest }) => {
  const [confirmation_code, setConfirmation_code] = useState("");
  const [seconds, setSeconds] = React.useState(59);
  const [modal, setModal] = React.useState(false);
  const [error, setError] = React.useState("");

  const sendConfirmationNumber = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const data = {
      phone: `+${phone}`,
      confirmation_code: confirmation_code,
    };
    const url = "/users/new-phone-confirm/";

    izzi
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setModal({
          text: response.data.message,
        });
      })
      .catch((err) => {
        setError(Object.values(err.response.data));
      });
  };
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("");
    }
  }, [seconds]);

  return (
    <main className="change__phone-number background-grey">
      <div className="crumb">
        <div className="container">
          <div className="crumb-list">
            <Link href="/">
              <a className="crumb-item">Главная</a>
            </Link>
            <span className="crumb-item">Смена номера</span>
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
                  <h1 className="title-box"> Смена номера</h1>
                  <span className={styles.phone_span}>{`+${phone}`}</span>
                  <a
                    className={styles.title}
                    onClick={(e) => setCurrentForm("changeNumber")}
                  >
                    Неверный номер телефона?
                  </a>
                  <div className="change-num__wrapper">
                    <form
                      className="change-number"
                      onSubmit={(e) => sendConfirmationNumber(e)}
                    >
                      <small className={error ? "error" : "hide"}>
                        {error}
                      </small>
                      <label className="partner-input">
                        <input
                          type="text"
                          placeholder="Введите код подтверждения"
                          onChange={({ target: { value } }) =>
                            setConfirmation_code(value)
                          }
                        />
                      </label>
                      <button className="partners-submit" type="submit">
                        Сменить номер
                      </button>
                      <div className="timer-block">
                        <div className="text">Не пришло SMS сообщение?</div>
                        <button
                          className="button-enter-code"
                          disabled={seconds}
                          onClick={(e) => sendPhoneRequest(e)}
                        >
                          {seconds
                            ? `Отправить снова через 00: ${seconds}`
                            : "Отправить снова"}
                        </button>
                      </div>
                    </form>
                    <div>
                      <div
                        id={modal ? "myModal" : "hide"}
                        className="modal_window"
                      >
                        <div>
                          <div>
                            {modal ? (
                              <ChangeNumberModalWindow text={modal.text} />
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <a href="#" className="modal-overlay" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConfirmChangeNumber;
