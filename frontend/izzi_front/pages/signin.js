import React from "react";
import { MainLayout } from "../components/MainLayout";
import SignInMain from "../components/signIn/signInMain";

const signin = () => {
    return (
        <MainLayout title={"Вход"}>
            <SignInMain/>
        </MainLayout>
    );
};

export default signin;
