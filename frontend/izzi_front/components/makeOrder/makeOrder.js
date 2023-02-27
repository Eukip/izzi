import React, {useEffect} from 'react';
import Link from "next/link";
import FooterSideBarLeftSide from "../../pages/footerSideBarLeftSide";
import {useDispatch, useSelector} from "react-redux";
import { fetchMakeOrder } from '../../store/actions/makeOrder';



const MakeOrder = () => {
    const dispatch = useDispatch();
    const MakeOrderItems = useSelector(({ makeOrder }) =>  makeOrder.MakeOrderItems);
    const isLoaded = useSelector(({ makeOrder }) =>  makeOrder.isLoaded);
    useEffect(() => {
      dispatch(fetchMakeOrder());
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
                            <span className="crumb-item">Как сделать заказ</span>
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
                                        <h3 className="title-box">Как сделать заказ</h3>
                                        <div className="text">
                                            {MakeOrderItems.description}
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

export default MakeOrder;