import Link from "next/link";
import * as React from 'react';

const ChangeNumberModalWindow = ({text}) => {

    React.useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => (document.body.style.overflowY = "auto");
    },[]);


    return (
        <div className="modalWrapper">
            <div className="modal_container" id="modal">
                <div className="icon_wrapper">
                    <img src="/svg/PartnerBid.svg" alt="success" />
                </div>
                <div className="text_wrapper">
                    <p>{text}</p>
                    <Link href={"/"}>
                        <a className="partners-submit">На главную</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChangeNumberModalWindow;
