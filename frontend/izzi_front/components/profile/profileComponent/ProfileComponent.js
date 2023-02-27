import React, {useEffect, useState} from "react";
import Sidebar from "../sidebar/Sidebar";
import Link from "next/link";
import izzi from "../../../adapters/axios.config";

const ProfileComponent = () => {
    const [first_name, setFirst_Name] = useState("")
    const [last_name, setLast_Name] = useState("")
    const [changeSuccess, setChangeSuccess] = useState(false)

    const userChangeHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!first_name.trim() && !last_name.trim()) {
            return
        }
        try {
            izzi.patch("/users/profile/", {
                first_name,
                last_name
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage?.getItem("access_token")}`
                }
            })
                .then(res => {
                    setChangeSuccess(true)
                    localStorage.setItem("first_name", first_name)
                    localStorage.setItem("last_name", last_name)
                })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setLast_Name(localStorage.getItem('first_name'))
        setFirst_Name(localStorage.getItem('last_name'))
    }, [])

    return (
        <main className="profile-page background-grey">
            <div className="crumb">
                <div className="container">
                    <div className="crumb-list">
                        <Link href="/">
                            <a className="crumb-item">
                                Главная
                            </a>
                        </Link>
                        <span className="crumb-item">Профиль</span>
                    </div>
                </div>
            </div>
            <div className="about-us__wrapper">
                <div className="container">
                    <div className="about-us__content">
                        <Sidebar/>
                        <div className="about-us__right">
                            <div className="about-us__right-inner change-num__content">
                                <div className="my-coupon__content">
                                    <h1 className="title-box">Профиль</h1>
                                    <div className="change-num__wrapper">
                                        <small className={changeSuccess ? "success" : "hide"}>Данные успешно
                                            изменены</small>
                                        <form className="change-number">
                                            <label className="partner-input">
                                                <input
                                                    onChange={e => setLast_Name(e.target.value)}
                                                    type="text"
                                                    value={last_name || ""}
                                                    placeholder={"Фамилия"}
                                                />
                                            </label>
                                            <div className="error-msg"/>
                                            <label className="partner-input">
                                                <input
                                                    onChange={e => setFirst_Name(e.target.value)}
                                                    type="text"
                                                    value={first_name || ""}
                                                    placeholder={"Имя"}
                                                />
                                            </label>
                                            <div className="error-msg"/>
                                            <button
                                                className="partners-submit"
                                                type="submit"
                                                onClick={(e) => userChangeHandler(e)}
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
            <div className="modal-success hide">
                <div className="modal-success__inner">
                    <div className="img">
                        <img src="img/svg/check.svg" alt=""/>
                    </div>
                    <div className="text">Пароль успешно изменен</div>
                    <a className="partners-submit" href="#">
                        На главную
                    </a>
                </div>
            </div>
        </main>
    );
};

export default ProfileComponent;
