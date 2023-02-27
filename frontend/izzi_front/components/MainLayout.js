import Head from "next/head";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import 'react-phone-input-2/lib/style.css'

export function MainLayout({ children, title = "izzzi" }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="theme-color" content="#ffffff" />
                <link rel='shortcut icon' href='/svg/Favicon.svg' type="image/svg/"/>

            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
