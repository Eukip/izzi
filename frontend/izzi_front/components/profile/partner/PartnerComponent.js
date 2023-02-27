import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Link from "next/link";
import izzi from "../../../adapters/axios.config";
import ModalWindowRejected from "./ModalWindowRejected";

const PartnerComponent = () => {
  const [form, setForm] = useState({});
  const [inputErrors, setInputErrors] = useState({});
  const [fieldInput, setFieldInput] = useState([]);
  const [img, setImg] = useState("/svg/photo-icon.svg");
  const [formValid, setFormValid] = useState(true);
  const [modal, setModal] = useState(false);

  const url = "/users/partner-bid/";

  const urlRegular = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const phoneRegular = /^(\+\d{2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const emailRegular = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const addressChange = (e) => {
    urlCheck(e);
    handleChange(e);
  };
  const emailChange = (e) => {
    emailCheck(e);
    handleChange(e);
  };
  const phoneChange = (e) => {
    phoneCheck(e);
    handleChange(e);
  };
  const urlCheck = (e) => {
    if (!e.target.value.length) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "заполните строку",
          isBlur: true,
        },
      });
    } else if (!urlRegular.test(String(e.target.value))) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "должен быть url",
          isBlur: true,
        },
      });
    } else {
      const newErrorState = JSON.parse(JSON.stringify(inputErrors));
      delete newErrorState[e.target.name];
      setInputErrors(newErrorState);
    }
  };
  const textCheck = (e) => {
    if (!e.target.value.length) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "заполните строку!",
          isBlur: true,
        },
      });
    } else {
      const newErrorState = JSON.parse(JSON.stringify(inputErrors));
      delete newErrorState[e.target.name];
      setInputErrors(newErrorState);
    }
  };
  const emailCheck = (e) => {
    if (!e.target.value.length) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "заполните строку!",
          isBlur: true,
        },
      });
    } else if (!emailRegular.test(e.target.value)) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "должен быть email!",
          isBlur: true,
        },
      });
    } else {
      const newErrorState = JSON.parse(JSON.stringify(inputErrors));
      delete newErrorState[e.target.name];
      setInputErrors(newErrorState);
    }
  };
  const phoneCheck = (e) => {
    if (!e.target.value.length) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "заполните номер!",
          isBlur: true,
        },
      });
    } else if (!phoneRegular.test(String(e.target.value))) {
      setInputErrors({
        ...inputErrors,
        [e.target.name]: {
          text: "заполните в виде +996555555555",
          isBlur: true,
        },
      });
    } else {
      const newErrorState = JSON.parse(JSON.stringify(inputErrors));
      delete newErrorState[e.target.name];
      setInputErrors(newErrorState);
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name !== "email" && e.target.name !== "phone1") {
      textCheck(e);
    }
  };
  const handleNetworkChange = (e) => {
    setForm({
      ...form,
      network: {
        ...form.network,
        [e.target.name]: e.target.value,
      },
    });
    urlCheck(e);
  };
  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setForm({
      ...form,
      [e.target.name]: e.target.files[0],
    });
    setImg(file);
  };
  const handleAdd = () => {
    if (fieldInput.length > 1) {
      return;
    }
    const values = [...fieldInput];
    values.push({ value: null });
    setFieldInput(values);
  };

  useEffect(() => {
    if (
      !Object.keys(inputErrors).length &&
      Object.keys(form).length > 0 &&
      form.logo &&
      form.company_name &&
      form.description &&
      form.email &&
      form.phone1
    ) {
      setFormValid(true);
    } else setFormValid(false);
  }, [inputErrors, form]);

  const postRequest = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const data = {
      ...form,
      network: JSON.stringify({
        ...form.network,
      }),
    };
    for (let key in data) {
      formData.append([key], data[key]);
    }
    izzi
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setForm({});
        setImg("/svg/photo-icon.svg");
        setModal({
          type: "success",
          text: response.data.detail,
        });
      })
      .catch((error) => {
        setModal({
          type: "error",
          text: error.response.data.detail,
        });
      });
  };

  return (
    <main className="partner__page background-grey">
      <div className="crumb">
        <div className="container">
          <div className="crumb-list">
            <Link href="/">
              <a className="crumb-item">Главная</a>
            </Link>
            <span className="crumb-item">Стать партнером</span>
          </div>
        </div>
      </div>
      <div className="about-us__wrapper">
        <div className="container">
          <div className="about-us__content">
            <Sidebar />
            <div className="about-us__right">
              <div className="about-us__right-inner">
                <div className="partner-content">
                  <h1 className="title-section">Стать партнером</h1>
                  <form
                    className="partner-form"
                    onSubmit={(e) => postRequest(e)}
                  >
                    <div className="partner-left">
                      <h3 className="title-box2">Заполните формы</h3>
                      <div className="upload-img__block">
                        <div className="input-file">
                          <img className="img-file" src={img} />
                          <label
                            htmlFor="imgInp2"
                            onChange={(e) => handleFileChange(e)}
                          >
                            Загрузите аватар
                            <input
                              accept="image/jpeg,image/png,image/jpg"
                              id="imgInp2"
                              type="file"
                              name="logo"
                            />
                          </label>
                        </div>
                        {inputErrors.company_name?.isBlur &&
                        inputErrors.company_name?.text ? (
                          <small className={"partner_small"}>
                            {inputErrors.company_name.text}
                          </small>
                        ) : null}
                        <label
                          className={`${
                            inputErrors.company_name?.text
                              ? "partner_error"
                              : ""
                          } partner-input`}
                        >
                          <input
                            type="text"
                            placeholder="Название компании *"
                            name="company_name"
                            onChange={(e) => handleChange(e)}
                            value={form.company_name || ""}
                          />
                        </label>
                        {inputErrors.description?.isBlur &&
                        inputErrors.description?.text ? (
                          <small className={"partner_small"}>
                            {inputErrors.description.text}
                          </small>
                        ) : null}
                        <label
                          className={`${
                            inputErrors.description?.text ? "partner_error" : ""
                          } partner-input`}
                        >
                          <textarea
                            placeholder="Описание компании. Например: чем занимается компания *"
                            name="description"
                            onChange={(e) => handleChange(e)}
                            value={form.description || ""}
                          ></textarea>
                        </label>
                      </div>
                      <h3 className="title-box2">Что дает партнерство</h3>
                      <div className="partner-text">
                        Компания izzzi— лидер кыргызского рынка по продаже
                        скидочных купонов. Миллионы клиентов доверяют нам самое
                        дорогое: свое свободное время. Каждый день мы помогаем
                        реализовать давно задуманное с самым лучшим ценовым
                        предложением. Секрет нашего успеха - наши партнеры. На
                        данный момент, Izzzi имеет партнеров , которые нам
                        доверяют и помогают каждый день делать наших клиентов
                        чуть более счастливыми, чем вчера.
                      </div>
                    </div>
                    <div className="partner-right">
                      <h3 className="title-box2">Укажите ваши контакты</h3>
                      <div className="partners-contacts">
                        {inputErrors.email?.isBlur &&
                        inputErrors.email?.text ? (
                          <small className={"partner_small"}>
                            {inputErrors.email.text}
                          </small>
                        ) : null}
                        <label
                          className={`${
                            inputErrors.email?.text ? "partner_error" : ""
                          } partner-input icon email`}
                        >
                          <input
                            type="text"
                            placeholder="E-mail *"
                            name="email"
                            onChange={(e) => emailChange(e)}
                            value={form.email || ""}
                          />
                        </label>
                        {inputErrors.address?.isBlur &&
                        inputErrors.address?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.address.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon web">
                          <input
                            type="text"
                            placeholder="Web-сайт"
                            name={"address"}
                            onChange={(e) => addressChange(e)}
                            value={form.address || ""}
                          />
                        </label>
                        {inputErrors.phone1?.isBlur &&
                        inputErrors.phone1?.text ? (
                          <small className={"partner_small"}>
                            {inputErrors.phone1.text}
                          </small>
                        ) : null}
                        <label
                          className={`${
                            inputErrors.phone1?.text ? "partner_error" : ""
                          } partner-input icon phone`}
                        >
                          <input
                            type="text"
                            placeholder="Номер телефона *"
                            name="phone1"
                            onChange={(e) => phoneChange(e)}
                            value={form.phone1 || ""}
                          />
                        </label>
                        {fieldInput.map((field, idx) => {
                          return (
                            <div key={`${field}`}>
                              <label className="partner-input icon phone">
                                <input
                                  type="text"
                                  placeholder="Номер телефона"
                                  name={`phone${idx + 2}`}
                                  value={form[`phone${idx + 2}`] || ""}
                                  onChange={(e) =>
                                    idx === 0 ? phoneChange(e) : phoneChange(e)
                                  }
                                />
                              </label>
                            </div>
                          );
                        })}
                        <div
                          className="added-phone-number"
                          onClick={() => handleAdd()}
                        >
                          Добавить номер телефона
                        </div>
                      </div>
                      <h3 className="title-box2">Укажите ваши соц. сети</h3>
                      <div className="partners-social-links">
                        {inputErrors.instagram?.isBlur &&
                        inputErrors.instagram?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.instagram.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon insta">
                          <input
                            type="text"
                            value={form.network?.instagram || ""}
                            placeholder="instagram"
                            name={"instagram"}
                            onChange={(e) => handleNetworkChange(e)}
                          />
                        </label>
                        {inputErrors.facebook?.isBlur &&
                        inputErrors.facebook?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.facebook.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon facebook">
                          <input
                            name="facebook"
                            value={form.network?.facebook || ""}
                            onChange={(e) => handleNetworkChange(e)}
                            type="text"
                            placeholder="facebook"
                          />
                        </label>
                        {inputErrors.odnoklassniki?.isBlur &&
                        inputErrors.odnoklassniki?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.odnoklassniki.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon ok">
                          <input
                            type="text"
                            value={form.network?.odnoklassniki || ""}
                            placeholder="odnoklassniki"
                            name={"odnoklassniki"}
                            onChange={(e) => handleNetworkChange(e)}
                          />
                        </label>
                        {inputErrors.vkontakte?.isBlur &&
                        inputErrors.vkontakte?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.vkontakte.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon vk">
                          <input
                            type="text"
                            value={form.network?.vkontakte || ""}
                            placeholder="vkontakte"
                            name={"vkontakte"}
                            onChange={(e) => handleNetworkChange(e)}
                          />
                        </label>
                        {inputErrors.whatsapp?.isBlur &&
                        inputErrors.whatsapp?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.whatsapp.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon whats-app">
                          <input
                            type="text"
                            value={form.network?.whatsapp || ""}
                            placeholder="whatsapp"
                            name={"whatsapp"}
                            onChange={(e) => handleNetworkChange(e)}
                          />
                        </label>
                        {inputErrors.telegram?.isBlur &&
                        inputErrors.telegram?.text ? (
                          <small style={{ color: "red" }}>
                            {inputErrors.telegram.text}
                          </small>
                        ) : null}
                        <label className="partner-input icon telegram">
                          <input
                            type="text"
                            value={form.network?.telegram || ""}
                            placeholder="telegram"
                            name={"telegram"}
                            onChange={(e) => handleNetworkChange(e)}
                          />
                        </label>
                        <button
                          className="partners-submit"
                          type="submit"
                          disabled={!formValid}
                        >
                          Отправить заявку
                        </button>
                        <div>
                          <div
                            id={modal ? "myModal" : "hide"}
                            className="modal_window"
                          >
                            <div>
                              <div>
                                {modal ? (
                                  <ModalWindowRejected
                                    type={modal.type}
                                    text={modal.text}
                                    closeModal={() => setModal(false)}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <a href="#" className="modal-overlay" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default PartnerComponent;
