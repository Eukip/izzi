import Link from "next/link";
import React from "react";

const ChangeNum = () => {
    const [seconds, setSeconds] = React.useState(59);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds("BOOOOM!");
        }
    });
    return (
        //TODO убрать класс hide
        // <div className="registration-content hide">
        <div className="registration-content">
            <h1 className="title-box"> Подтверждение номера телефона</h1>
            <div className="change-num-sand-code__wrapper">
                <div className="change-num__info">
                    <div className="phone-number">+996 555 55 55 55</div>
                    <Link href={"/signup"}>
                        <a className="wrong-number" href="">
                            Неверный номер телефона?
                        </a>
                    </Link>
                </div>
                <form className="change-number">
                    <label className="partner-input">
                        <input
                            type="text"
                            placeholder="Введите код подтверждения"
                        />
                    </label>
                    <button
                        className="partners-submit"
                        type="submit"
                        // disabled="disabled"
                    >
                        Подтвердить
                    </button>
                    <div className="timer-block">
                        <div className="text">Не пришло SMS сообщение?</div>
                        <div className="button-enter-code">
                            Отправить снова через
                            <span className="timer-className">00:{seconds}</span>
                        </div>
                    </div>
                    <div className="error-msg"></div>
                </form>
            </div>
        </div>
    );
};

export default ChangeNum;
