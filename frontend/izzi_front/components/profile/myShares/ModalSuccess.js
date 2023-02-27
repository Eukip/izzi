import React from "react";


const Modal = ({modalSuccess,setModalSuccess}) => {
    return (
        <div
            className={modalSuccess ? "modal active" : "modal"}
            id="modal-1"
            aria-hidden="true"
        >
            <div tabIndex="-1" data-micromodal-close="">
                <div role="dialog" aria-modal="true" aria-labelledby="">
                    <div
                        className={modalSuccess ? "modal__content active" : "modal__content "}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="close"
                            aria-label="Close modal"
                            data-micromodal-close=""
                            onClick={() => setModalSuccess(false)}
                        >
                            <img
                                src="/svg/close.svg"
                                className="close"
                                onClick={() => setModalSuccess(false)}
                            />
                        </div>
                        <div className="success">
                            <img src="/svg/check.svg" />
                            <div className="title">
                                Купон успешно активирован
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
