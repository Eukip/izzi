import * as React from "react";
import izzi from "../../adapters/axios.config";
import ModalSuccessSignUp from "./ModalSuccessSignUp";

const Confirmation = ({ regForm, setRegForm, onSubmitHandler, setForm }) => {
  const [serverResponse, setServerResponse] = React.useState("");
  const [seconds, setSeconds] = React.useState(59);
  const [modal, setModal] = React.useState(false)
  const [flag, setFlag] = React.useState({
    codeError: false,
    showCode: false,
  });

  const handleFlags = (flag) =>
    setFlag((oldState) => ({ ...oldState, [flag]: !oldState[flag] }));

  const onChangeRegForm = (e) => {
    setRegForm((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("");
    }
  }, [seconds]);

  const confirmationHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    izzi
      .post("/users/login-confirm/", {
        phone: regForm.phone.replace(/[^+\d]+/g, ""),
        password: regForm.password,
        password2: regForm.password2,
        first_name: regForm.first_name,
        last_name: regForm.last_name,
        confirmation_code: regForm.confirmation_code,
      })
      .then((response) => {
        setModal({
          text: response.data.message,
        });
      })
      .catch((error) => {
        setServerResponse(Object.values(error.response.data));
      });
  };
  return (
    <React.Fragment>
      <div className={"registration-content"}>
        <h1 className="title-section"> Подтверждение номера телефона</h1>
        <div className="change-num-sand-code__wrapper">
          <div className="change-num__info">
            <div className="phone-number">{regForm.phone || ""}</div>
            <a
              className={"phone-number_link"}
              onClick={(e) => setForm("registrationForm")}
            >
              Неверный номер телефона?
            </a>
          </div>
          <form className="change-number">
            <small className={serverResponse ? "error" : "hide"}>{serverResponse}</small>
            <label className="partner-input password">
              <div
                className={
                  flag.showCode
                    ? "hide-show__password show"
                    : "hide-show__password"
                }
                onClick={() => handleFlags("showCode")}
              />
              <div className={flag.codeError ? "error" : "hide"}>
                Код подтверждения не совпадает
              </div>
              <input
                type={flag.showCode ? "text" : "password"}
                placeholder="Введите код подтверждения"
                name={"confirmation_code"}
                onChange={(e) => onChangeRegForm(e)}
              />
            </label>
            <button
              className="partners-submit"
              type="submit"
              onClick={(event) => confirmationHandler(event)}
            >
              Подтвердить
            </button>
          </form>
          <div className="timer-block">
            <div className="text">Не пришло SMS сообщение?</div>
            <button
              className="button-enter-code"
              disabled={seconds}
              onClick={(e) => onSubmitHandler(e)}
            >
              {seconds
                ? `Отправить снова через 00: ${seconds}`
                : "Отправить снова"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div id={modal ? "myModal" : "hide"} className="modal_window">
          <div>
            <div>
              {modal ? (
                <ModalSuccessSignUp text={modal.text} />
              ) : null}
            </div>
          </div>
        </div>
        <a href="#" className="modal-overlay" />
      </div>
    </React.Fragment>
  );
};

export default Confirmation;
