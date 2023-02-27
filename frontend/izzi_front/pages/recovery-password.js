import React from "react";
import { MainLayout } from "../components/MainLayout";
import RecoveryPassword from "../components/recoveryPassword/recoveryPassword";

export default function recoveryPasswordMain() {
    return (
        <MainLayout title={"Сброс пароля"}>
            <RecoveryPassword/>
        </MainLayout>
    );
}

