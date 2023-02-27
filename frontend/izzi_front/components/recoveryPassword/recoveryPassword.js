import * as React from "react";
import RecoverySignIn from "./recoverySignIn";
import RecoveryConfirm from "./recoveryConfirm";
import RecoveryNewPassword from "./recoveryNewPassword";
import izzi from "../../adapters/axios.config";

const RecoveryPassword = () => {
  const [currentPage, setCurrentPage] = React.useState("recoverySignIn");
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState("");
  const [errorsTwo, setErrorsTwo] = React.useState("");
  const [errorsThree, setErrorsThree] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const urlSignIn = "/users/recovery-password-send-sms/";
  const urlConfirm = "/users/recovery-password-confirm/";
  const urlPassword = "/users/recovery-password/";

  const handleFormChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const phoneRequest = (e, arg) => {
    e.preventDefault();
    e.stopPropagation();
    switch (arg) {
      case "signin":
        izzi
          .post(
            urlSignIn,
            {
              phone: `+${form.phone}`,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => setCurrentPage("recoveryConfirm"))
          .catch((error) => {
            setErrors(Object.values(error.response.data));
          });

        break;
      case "confirm":
        izzi
          .post(
            urlConfirm,
            {
              phone: `+${form.phone}`,
              confirmation_code: form.confirmation_code,
            },

            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => setCurrentPage("recoveryNewPassword"))
          .catch((error) => {
            setErrorsTwo(Object.values(error.response.data));
          });
        break;
      case "newPassword":
        izzi
          .patch(
            urlPassword,
            {
              phone: `+${form.phone}`,
              confirmation_code: form.confirmation_code,
              new_password: form.new_password,
              new_password_repeat: form.new_password_repeat,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            setModal({
              text: response.data.message,
            });
          })
          .catch((error) => {
            setErrorsThree(Object.values(error.response.data));
          });
    }
  };

  const currentForm = () => {
    switch (currentPage) {
      case "recoverySignIn":
        return (
          <RecoverySignIn
            phoneRequest={phoneRequest}
            phone={form.phone}
            errors={errors}
            formChange={handleFormChange}
          />
        );
      case "recoveryConfirm":
        return (
          <RecoveryConfirm
            phoneRequest={phoneRequest}
            phone={form.phone}
            setConfirmation_code={form.setConfirmation_code}
            errorsTwo={errorsTwo}
            formChange={handleFormChange}
          />
        );
      case "recoveryNewPassword":
        return (
          <RecoveryNewPassword
            phoneRequest={phoneRequest}
            setNew_password={form.setNew_password}
            errorsThree={errorsThree}
            modal={modal}
            formChange={handleFormChange}
          />
        );
      default:
        return null;
    }
  };

  return <>{currentForm()}</>;
};

export default RecoveryPassword;
