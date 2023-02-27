import React from "react";
import dynamic from "next/dynamic";
// import QrReader from 'react-qr-reader'


const Modal = ({modalActivation,setModalActivation, handleError, handleScan,error}) => {
    const QrReader = dynamic(() => import('react-qr-reader'),{ ssr: false })
    return (
        <div
            className={modalActivation ? "modal active" : "modal"}
            id="modal-1"
            aria-hidden="true"
        >
            <div tabIndex="-1" data-micromodal-close="">
                <div role="dialog" aria-modal="true" aria-labelledby="">
                    <div
                        className={modalActivation ? "modal__content active" : "modal__content "}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="close"
                            aria-label="Close modal"
                            data-micromodal-close=""
                            onClick={() => setModalActivation(false)}
                        >
                            <img
                                src="/svg/close.svg"
                                className="close"
                                onClick={() => setModalActivation(false)}
                            />
                        </div>
                        <div className="qrCodeWrap">
                            <p className="error">{error.text1}</p>
                            <p className="error">{error.text2}</p>
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
