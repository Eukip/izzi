import React from 'react';
import PhoneInput from "react-phone-input-2";

const RecoverySignIn = ({phoneRequest,phone, errors, formChange}) => {

    return (
        <div className={"change__phone-number background-grey"}>
            <div className={"registration-content"}>
                <h1 className="title-section">Восстановление пароля</h1>
                <div className="change-num__description">
                    Введите новый номер телефона чтобы
                    отправить код подтверждения
                </div>
                <div className="change-num__wrapper">
                    <form onSubmit={(e) => phoneRequest(e, "signin")}>
                        <small className={errors ? "error" : "hide"}>{errors}</small>
                        <label className="partner-input">
                            <PhoneInput
                                country={'kg'}
                                value={phone}
                                placeholder={"Номер телефона"}
                                onChange={phone => formChange('phone', phone)}
                                inputProps={{
                                    name: 'phone',
                                    maxLength: 16,
                                }}
                            />
                        </label>
                        <button type="submit" className={"partners-submit" }>
                            Далее
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecoverySignIn;