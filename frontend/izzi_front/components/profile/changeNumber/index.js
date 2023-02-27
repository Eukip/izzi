import * as React from "react";
import ChangeNumber from "./ChangeNumber";
import ConfirmChangeNumber from "./ConfirmChangeNumber";
import izzi from "../../../adapters/axios.config";


const Index = () => {
  const [phone, setPhone] = React.useState("");
  const [currentForm, setCurrentForm] = React.useState("changeNumber");
  const [errors, setErrors] = React.useState("");

  const data = {
    phone: `+${phone}`,
  };

  const url = "/users/change-old-phone/";
  const sendPhoneRequest = (e) => {
    e.preventDefault();
    e.stopPropagation();
    izzi
        .post(url, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => setCurrentForm("changeNumberConfirm"))
        .catch((error) => {
          setErrors(Object.values(error.response.data))
        });

  };


  const currentPage = () => {
    switch (currentForm) {
      case "changeNumber":
        return (
          <ChangeNumber
            phone={phone}
            setPhone={setPhone}
            sendPhoneRequest={sendPhoneRequest}
            setCurrentForm={setCurrentForm}
            errors={errors}
          />
        );
      case "changeNumberConfirm":
        return (
          <ConfirmChangeNumber
            phone={phone}
            sendPhoneRequest={sendPhoneRequest}
            setCurrentForm={setCurrentForm}
          />
        );
      default:
        return null;
    }
  };
  return <>{currentPage()}</>;
};

export default Index;
