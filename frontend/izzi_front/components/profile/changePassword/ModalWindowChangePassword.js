import React from 'react';
import Link from "next/link";

const ModalWindowChangePassword = ({modalWindow}) => {
    return (
    <div className="modal-container" id="modal">
        <div className="modal-success">
            <div className="modal-success__inner">
                <div className="img">
                    <img src="/svg/PartnerBid.svg"/>
                </div>
                <div className="text">{modalWindow}</div>
                <Link href={"/"}>
                    <a className="partners-submit">
                        На главную
                    </a>
                </Link>
            </div>
        </div>

    </div>
    );
};

export default ModalWindowChangePassword;