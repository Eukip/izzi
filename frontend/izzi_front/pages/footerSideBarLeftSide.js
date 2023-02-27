import React from 'react';
import Link from "next/link";

const FooterSideBarLeftSide = () => {
    return (
        <div className="main-sub-menu__left">
            <div className="main-sub-menu__left-inner">
                <ul className="make-order__links wrapper-for-main-icon">
                    <li>
                        <Link href="/make-order">
                            <a className="make-order-area">Как сделать заказ</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/payment-ways">
                            <a className="payment-ways-area">Способы оплаты</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/answer-questions">
                            <a className="answer-questions-area">Вопросы и ответы</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FooterSideBarLeftSide;