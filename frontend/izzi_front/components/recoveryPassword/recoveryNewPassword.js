import * as React from "react";
import ChangeNumberModalWindow from "../profile/changeNumber/ChangeNubmerModalWindow";


const RecoveryNewPassword = ({phoneRequest, errorsThree, modal, formChange}) => {
  const [flags, setFlags] = React.useState({
    showCode: false,
    showCodeTwo: false,
  });
  const handleFlags = (flags) =>
    setFlags((oldState) => ({ ...oldState, [flags]: !oldState[flags] }));


  return (
    <React.Fragment>
      <main className={"change__phone-number background-grey"}>
        <div className={"registration-content"}>
          <h1 className="title-section">Восстановление пароля</h1>
          <form className="change-number" onSubmit={(e) => phoneRequest(e,"newPassword")}>
            <small className={errorsThree ? "error" : "hide"}>{errorsThree}</small>
            <label className="partner-input">
              <input
                type={flags.showCode ? "text" : "password"}
                placeholder="Введите новый пароль"
                name="new_password"
               onChange={({target: {name, value}}) => formChange(name, value)}
              />
              <div
                className={
                  flags.showCode
                    ? "hide-show__password show"
                    : "hide-show__password"
                }
                onClick={() => handleFlags("showCode")}
              >

              </div>
            </label>
            <label className="partner-input">
              <input
                type={flags.showCodeTwo ? "text" : "password"}
                placeholder="Повторите новый пароль"
                name="new_password_repeat"
                onChange={({target: {name, value}}) => formChange(name, value)}
              />
              <div
                className={
                  flags.showCodeTwo
                    ? "hide-show__password show"
                    : "hide-show__password"
                }
                onClick={() => handleFlags("showCodeTwo")}
              >

              </div>
            </label>
            <button className="partners-submit" type="submit">
              Далее
            </button>
          </form>
          <div>
            <div
                id={modal ? "myModal" : "hide"}
                className="modal_window"
            >
              <div>
                <div>
                  {modal ? (
                      <ChangeNumberModalWindow text={modal.text}/>
                  ) : null}
                </div>
              </div>
            </div>
            <a href="#" className="modal-overlay" />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default RecoveryNewPassword;
