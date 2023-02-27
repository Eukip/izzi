import React, {useEffect, useState} from 'react';
import Link from "next/link";
import FooterSideBarLeftSide from "../../pages/footerSideBarLeftSide";
import {useDispatch, useSelector} from "react-redux";
import {fetchPaymentWays} from "../../store/actions/paymentWays";



const PaymentWays = () => {
    const dispatch = useDispatch();
    const PaymentItems = useSelector(({ paymentWays }) => paymentWays.PaymentItems);
    const isLoaded = useSelector(({ paymentWays }) => paymentWays.isLoaded);
    useEffect(() => {
      dispatch(fetchPaymentWays());
    }, []);
    return (
        <main className="home-page">
            <div className="main-sub-menu__page background-grey">
                <div className="crumb">
                    <div className="container">
                        <div className="crumb-list">
                            <Link href="/">
                                <a className="crumb-item">
                                    Главная
                                </a>
                            </Link>
                            <span className="crumb-item">Способы оплаты</span>
                        </div>
                    </div>
                </div>
                <div className="main-sub-menu__wrapper">
                    <div className="container">
                        <div className="main-sub-menu__content" id="tabs-about-us">
                            <FooterSideBarLeftSide/>
                            <div className="main-sub-menu__right">
                                <div className="main-sub-menu__right-inner">
                                    <div className="main-sub-menu__description" id="tab-about-us-3">
                                        <h3 className="title-box">Способы оплаты</h3>
                                        <div className="text">
                                           {PaymentItems.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentWays;