import * as React from "react";
import Confirmation from "./Confirmation";
import RegistrationForm from "./RegistrationForm";
import izzi from "../../adapters/axios.config";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";


const RegistrationContent = () => {
  const [form, setForm] = React.useState("registrationForm");
  const [regForm, setRegForm] = React.useState({});
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});

  const dispatch = useDispatch();

  const errorBlock = useSelector(
      ({
         errorReducer: {
           error: {
             data: { message },
           },
         },
       }) => message
  );

  let schema = yup.object().shape({
    first_name: yup.string().required("Введите имя"),
    last_name: yup.string().required("Введите фамилию"),
    phone: yup
      .string()
      .required("Неверный номер телефона. (Например:+996706105915)"),
    password: yup.string().required("Введите пароль"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
      .required("Повторите пароль"),
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    schema.isValid(regForm).then((valid) => {
      if (valid) {
        setConfirm(!confirm);
        setFormErrors({});
        izzi
          .post("/users/auth/", {
            ...regForm,
            phone: regForm.phone.replace(/[^+\d]+/g, ""),
          })
          .then((response) => {
            setForm("registrationConfirm");
          })
          .catch((error) => {
            if (error.response.status === 429) {
              dispatch({ type: "GET_ERROR", payload: error.response });
            }
          });
      }
    });
    schema.validate(regForm, { abortEarly: false }).catch((err) => {
      err.inner.forEach((err) => {
        setFormErrors((oldErrors) => {
          return { ...oldErrors, [err.path]: err.message };
        });
      });
    });
  };

  const currentForm = () => {
    switch (form) {
      case "registrationForm":
        return (
          <RegistrationForm
            phone={phone}
            setPhone={setPhone}
            regForm={regForm}
            setRegForm={setRegForm}
            formErrors={formErrors}
            setError={setError}
            onSubmitHandler={onSubmitHandler}
            errorBlock={errorBlock}
          />
        );
      case "registrationConfirm":
        return (
          <Confirmation
            regForm={regForm}
            setForm={setForm}
            phone={phone}
            error={error}
            setRegForm={setRegForm}
            onSubmitHandler={onSubmitHandler}
          />
        );
      default:
        return null;
    }
  };

  return <>{currentForm()}</>;

};

export default RegistrationContent;
