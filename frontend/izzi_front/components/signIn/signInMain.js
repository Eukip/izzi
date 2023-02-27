import * as React from "react";
import SignInPhone from "./signInPhone";
import SignInPassword from "./signInPassword";
import { useState } from "react";
import izzi from "../../adapters/axios.config";

const SignInMain = () => {
  const [signInState, setSignInState] = React.useState({
    showPassword: false,
    loginError: false,
    error: false,
    toPassword: false,
    isLogged: true,
  });
  const [currentPage, setCurrentPage] = React.useState("signInPhone");
  const [phone, setPhone] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInState = (name, value) =>
    setSignInState((old) => ({ ...old, [name]: value }));

  const signInCheckPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    izzi
      .post("/users/check-user/", {
        phone: `+${phone}`,
      })
      .then((response) => setCurrentPage("signInPassword"))
      .catch((error) => {
        setErrorInput(Object.values(error.response.data));
      });
  };

  const currentForm = () => {
    switch (currentPage) {
      case "signInPhone":
        return (
          <SignInPhone
            phone={phone}
            setPhone={setPhone}
            errorInput={errorInput}
            signInCheckPhone={signInCheckPhone}
          />
        );
      case "signInPassword":
        return (
          <SignInPassword
            phone={phone}
            loginError={signInState.loginError}
            showPassword={signInState.showPassword}
            password={password}
            setPassword={setPassword}
            setCurrentPage={setCurrentPage}
            signState={signInState}
            handleSignInState={handleSignInState}
          />
        );
      default:
        return null;
    }
  };

  return <>{currentForm()}</>;
};

export default SignInMain;
