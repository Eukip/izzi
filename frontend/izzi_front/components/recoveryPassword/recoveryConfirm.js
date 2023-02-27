import * as React from "react";
import PhoneInput from "react-phone-input-2";

const RecoveryConfirm = ({phoneRequest,phone,errorsTwo, formChange}) => {

    const [seconds, setSeconds] = React.useState(59);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds("");
        }
    }, [seconds]);

    return (
        <React.Fragment>
            <main className={"change__phone-number background-grey"}>
                <div className={"registration-content"}>
                    <h1 className="title-section">Восстановление пароля</h1>
                    <div className="change-num-sand-code__wrapper">

                        <div className="change-num__info">
                            <p
                                className={"phone-number_link"}
                            >
                                Введите номер телефона чтобы отправить <br/>
                                код подтверждения
                            </p>
                        </div>
                        <form className="change-number" onSubmit={(e) => phoneRequest(e,"confirm")}>
                            <small className={errorsTwo ? "error" : "hide"}>{errorsTwo}</small>
                                <label className="partner-input">
                                    <PhoneInput
                                        country={'kg'}
                                        value={phone}
                                        placeholder={"Номер телефона"}
                                        onChange={phone => formChange('phone',phone)}
                                        inputProps={{
                                            name: 'phone',
                                            maxLength: 16,
                                        }}
                                    />
                            </label>
                            <label className="partner-input password">
                                <input
                                    placeholder="Введите код подтверждения"
                                    name="confirmation_code"
                                    onChange={({target: {name, value}}) => formChange(name, value)}
                                />
                            </label>
                            <button
                                className="partners-submit"
                                type="submit"
                            >
                                Подтвердить
                            </button>
                        </form>
                        <div className="timer-block">
                            <div className="text">Не пришло SMS сообщение?</div>
                            <button
                                className="button-enter-code"
                                disabled={seconds}
                                onClick={(e) => phoneRequest(e,"signin")}
                            >
                                {seconds
                                    ? `Отправить снова через 00: ${seconds}`
                                    : "Отправить снова"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
};

export default RecoveryConfirm;