import React from "react";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";

const SignInPhone = ({ phone, setPhone, errorInput, signInCheckPhone }) => {
  return (
    <main className="change__phone-number background-grey">
      <div className="registration-content">
        <h1 className="title-section">Войдите, чтобы продолжить</h1>
        <div className="change-num__wrapper">
          <form className="" onSubmit={(e) => signInCheckPhone(e)}>
            <div className={errorInput ? "error" : "hide"}>
              <small>{errorInput}</small>
            </div>
            <label className="partner-input">
              <PhoneInput
                country={"kg"}
                value={phone}
                placeholder={"Номер телефона"}
                masks={{kg: '(...) ..-..-..', ru: '(...) ...-..-..'}}
                onChange={(phone) => setPhone(phone)}
                inputProps={{
                  name: "phone",
                }}
              />
            </label>
            <button className="partners-submit" type="submit">
              Войти
            </button>
            <Link href={"/signup"}>
              <a className="registration-but">Зарегистрироваться</a>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInPhone;
