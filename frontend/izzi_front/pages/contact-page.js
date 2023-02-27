import React from "react";
import {MainLayout} from "../components/MainLayout";
import ContactPageItem from "../components/contactPageItem/ContactPage";

const ContactPage = () => {
    return (
        <MainLayout title={"Контакты"}>
            <ContactPageItem/>
        </MainLayout>
    );
};

export default ContactPage;
