import React from "react";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import CouponsItem from "../../../coupons/couponsItem/CouponsItem";
const MyCouponsContent = (userToken) => {
    const myCoupon = [userToken]
    return (
        <div className="about-us__right">
            <div className="about-us__right-inner">
                <div className="my-coupon__content">
                    <h1 className="title-section">Мои купоны</h1>
                    <div className="my-coupon__tabs">
                        <Tabs className="tabs" id="tabs-my-coupon">
                            <ul className="tabs-list">
                                <li>
                                    <a >
                                        <TabLink to="tab1">Активные</TabLink>
                                    </a>
                                </li>
                                <li>
                                    <a >
                                        <TabLink to="tab2">
                                            Активированные
                                        </TabLink>
                                    </a>
                                </li>
                                <li>
                                    <a >
                                        <TabLink to="tab3">Истекшие</TabLink>
                                    </a>
                                </li>
                            </ul>
                            <TabContent className="tabs-content" for="tab1">
                                <div className="coupons-list">
                                    {myCoupon.map(item => (
                                        <CouponsItem {...item[0]}/>
                                        // <CouponsItem item={item}/>
                                    ))}

                                </div>

                            </TabContent>
                            <TabContent className="tabs-content" for="tab2">
                                <div className="coupons-list">
                                    <div className="coupons-item">
                                        <a className="coupons-link" href=""></a>
                                        <div className="coupons-discount">
                                            10%
                                        </div>
                                        {/* <!-- TODO: добавить класс "active" при клике--> */}
                                        <div className="coupons-favorite"></div>
                                        <div className="coupons-image">
                                            <img
                                                src="https://picsum.photos/286/164"
                                                alt=""
                                            />
                                        </div>
                                        <div className="coupons-info">
                                            <div className="coupons-store">
                                                <div className="coupons-store-logo">
                                                    <img
                                                        src="https://picsum.photos/48/48"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="coupons-store-title">
                                                    Thomas Munz Ножиков Orby...
                                                </div>
                                            </div>
                                            <div className="coupons-desc">
                                                <p>
                                                    BLALASLASDLASLDALSDLASD
                                                </p>
                                            </div>
                                            <div className="coupons-price">
                                                <div className="coupons-new-price">
                                                    100 c
                                                </div>
                                                <div className="coupons-old-price">
                                                    160 c
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabContent>
                            <TabContent className="tabs-content" for="tab3">
                                {/*<div className="coupons-list">*/}
                                {/*    <div className="coupons-item">*/}
                                {/*        <a className="coupons-link" href="">*/}

                                {/*        </a>*/}
                                {/*        <div className="coupons-discount">*/}
                                {/*            20%*/}
                                {/*        </div>*/}
                                {/*        /!* <!-- TODO: добавить класс "active" при клике--> *!/*/}
                                {/*        <div className="coupons-favorite">*/}

                                {/*        </div>*/}
                                {/*        <div className="coupons-image">*/}
                                {/*            <img*/}
                                {/*                src="https://picsum.photos/286/164"*/}
                                {/*                alt=""*/}
                                {/*            />*/}
                                {/*        </div>*/}
                                {/*        <div className="coupons-info">*/}
                                {/*            <div className="coupons-store">*/}
                                {/*                <div className="coupons-store-logo">*/}
                                {/*                    <img*/}
                                {/*                        src="https://picsum.photos/48/48"*/}
                                {/*                        alt=""*/}
                                {/*                    />*/}
                                {/*                </div>*/}
                                {/*                <div className="coupons-store-title">*/}
                                {/*                    Thomas Munz Ножиков Orby...*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*            <div className="coupons-desc">*/}
                                {/*                <p>*/}
                                {/*                    Йоу я Купон а ты нет                                                   */}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*            <div className="coupons-price">*/}
                                {/*                <div className="coupons-new-price">*/}
                                {/*                    100 c*/}
                                {/*                </div>*/}
                                {/*                <div className="coupons-old-price">*/}
                                {/*                    160 c*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </TabContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCouponsContent;
