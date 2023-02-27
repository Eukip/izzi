import React, {useEffect} from 'react'

const ModalWindowRejected = ({type, text, closeModal}) => {

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        return () => document.body.style.overflowY = 'auto'
    })

    return (
        <div className="modalWrapper">
            <div className="modal_container" id="modal">
                <div className="icon_wrapper">
                    {type === 'error' ?
                        <img src="/svg/PartnerBidRej.svg" alt="error"/>
                        :
                        <img src="/svg/PartnerBid.svg" alt="success"/>}
                </div>
                <div className="text_wrapper">
                    <p>{text}</p>
                    <div className="modal_window_close" aria-label="Close modal">
                        <img
                            onClick={closeModal}
                            src="/svg/close.svg"
                            className="modal_window_close"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalWindowRejected;