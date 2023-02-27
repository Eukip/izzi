import React from 'react';
import QRCode from "react-qr-code";
import Link from 'next/link'
const ModalNoAuth = ({active,setActive}) => {
    return (
        <div
            className={active ? "modal active" : "modal"}
            id="modal-1"
            aria-hidden="true"
        >
            <div tabIndex="-1" data-micromodal-close="">
                <div role="dialog" aria-modal="true" aria-labelledby="">
                    <div
                        className={active ? "modal__content active" : "modal__content "}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="close"
                            aria-label="Close modal"
                            data-micromodal-close=""
                            onClick={() => setActive(false)}
                        >
                            <img
                                src="/svg/close.svg"
                                className="close"
                                onClick={() => setActive(false)}
                            />
                        </div>
                        <img src="/svg/modal-warning.svg" alt="" className="modal-warning"/>
                        <h2 className="modal-subtitle">
                            Для покупки купона нужно авторизироваться
                        </h2>
                        <Link href={'/signin'}>
                            <a  className="modal-btn modal-sign">
                                Войти
                            </a>
                        </Link>
                        <Link href={'/signup'}>
                            <a className="modal-btn modal-reg">
                                Зарегестрироваться
                            </a>
                        </Link>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default ModalNoAuth;