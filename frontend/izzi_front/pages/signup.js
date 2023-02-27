import React from "react";
import { MainLayout } from "../components/MainLayout";
import SignUpComponent from "../components/signUp/SignUpComponent";

const signup = () => {
    return (
        <MainLayout title={"Регистрация"}>
            <SignUpComponent/>
        </MainLayout>
    );
};

export default signup;
