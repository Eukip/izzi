import React from "react";
import { MainLayout } from "../components/MainLayout";
import ChangeNum from "../components/signUp/ChangeNum";

const verify = () => {
    return (
        <MainLayout title={"Подтверждение номера телефона"}>
            <ChangeNum/>
        </MainLayout>
    );
};

export default verify;
