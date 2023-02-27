import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";

const ChangeNumber = ({ phone, setPhone, sendPhoneRequest, errors }) => {
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
                  <div className="change-num__wrapper">
                    <div className="change-num__description">
                      Введите новый номер телефона чтобы отправить код
                      подтверждения
                    </div>
                    <form
                      className="change-number"
                      onSubmit={(e) => sendPhoneRequest(e)}
                    >
                      <small className={errors ? "error" : "hide"}>
                        {errors}
                      </small>
                      <label className="partner-input border">
                        <PhoneInput
                          country={"kg"}
                          value={phone}
                          placeholder={"Новый номер телефона"}
                          onChange={(phone) => setPhone(phone)}
                          inputProps={{
                            name: "phone",
                            maxLength: 16,
                          }}
                        />
                      </label>
                      <div className="error-msg"></div>
                      <button className="partners-submit" type="submit">
                        Далее
                      </button>
                    </form>
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

export default ChangeNumber;
