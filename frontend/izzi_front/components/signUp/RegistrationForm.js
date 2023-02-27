import * as React from "react";
import PhoneInput from "react-phone-input-2";

const RegistrationForm = ({
  regForm,
  setRegForm,
  formErrors,
  onSubmitHandler,
   errorBlock
}) => {

  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordSecond, setShowPasswordSecond] = React.useState(false);

  const onChangeRegForm = (e) => {
    setRegForm((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="registration-content">
      <div>
        <h1 className="title-box"> Регистрация</h1>
        <div className="change-num__wrapper">
          <form className="change-number" onSubmit={(e) => onSubmitHandler(e)}>
            {errorBlock ? <small className={errorBlock? "error" : "hide"}>
                {errorBlock}
              </small> : <small className={formErrors.first_name ? "error" : "hide"}>
              {formErrors.first_name}
            </small>}

            <label className="partner-input">
              <input
                type="text"
                name={"first_name"}
                placeholder="Имя"
                onChange={(e) => onChangeRegForm(e)}
              />
            </label>
            <small className={formErrors.last_name ? "error" : "hide"}>
              {formErrors.last_name}
            </small>
            <label className="partner-input">
              <input
                type="text"
                name={"last_name"}
                placeholder="Фамилия"
                onChange={(e) => onChangeRegForm(e)}
              />
            </label>
            <small className={formErrors.phone ? "error" : "hide"}>
              {formErrors.phone}
            </small>
            <label className="partner-input">
              <PhoneInput
                country={"kg"}
                value={regForm.phone}
                name={"phone"}
                masks={{kg: '(...) ..-..-..', ru: '(...) ...-..-..'}}
                onChange={(value, country, event) => onChangeRegForm(event)}
                inputProps={{
                  name: "phone",
                }}
              />
            </label>
            <small className={formErrors.password ? "error" : "hide"}>
              {formErrors.password}
            </small>
            <label className="partner-input password">
              <div
                onClick={() => setShowPassword(!showPassword)}
                className={
                  showPassword
                    ? "hide-show__password show"
                    : "hide-show__password"
                }
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Придумайте пароль"
                name={"password"}
                onChange={(e) => onChangeRegForm(e)}
              />
            </label>
            <small className={formErrors.password2 ? "error" : "hide"}>
              {formErrors.password2}
            </small>
            <label className="partner-input password">
              <div
                onClick={() => setShowPasswordSecond(!showPasswordSecond)}
                className={
                  showPasswordSecond
                    ? "hide-show__password show"
                    : "hide-show__password"
                }
              />
              <input
                name={"password2"}
                type={showPasswordSecond ? "text" : "password"}
                placeholder="Повторите пароль"
                onChange={(e) => onChangeRegForm(e)}
              />
            </label>
            <div className="error-msg"></div>
            <button className="partners-submit" type="submit">
              Далее
            </button>
          </form>
        </div>
        <div />
      </div>
    </div>
  );
};

export default RegistrationForm;
