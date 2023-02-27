import React, {useEffect} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {fetchPublicOffer} from "../../store/actions/publicOffer";

const PublicOffer = ({title, description}) => {
    const dispatch = useDispatch();
    const publicOfferItems = useSelector(({publicOffer}) => publicOffer.publicOfferItems );
    const isLoading = useSelector(({publicOffer}) => publicOffer.isLoading);

    useEffect(() => {
        dispatch(fetchPublicOffer())
    },[]);
    return (
        <main className="home-page">
            <div className="about-us__page background-grey">
                <div className="crumb">
                    <div className="container">
                        <div className="crumb-list">
                            <Link href="/">
                                <a className="crumb-item">Главная</a>
                            </Link>
                            <span className="crumb-item">Публичная оферта</span>
                        </div>
                    </div>
                </div>
                <div className="about-us__wrapper">
                    <div className="container">
                        <div className="about-us__content" id="tabs-about-us">
                            <div className="about-us__right">
                                <div className="about-us__right-inner">
                                    <div className="about-us__description" id="tab-about-us-3">
                                        <h3 className="title-box"  dangerouslySetInnerHTML={{ __html: publicOfferItems.title }}></h3>
                                        <div className="text" dangerouslySetInnerHTML={{ __html: publicOfferItems.description }}></div>
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

export default PublicOffer;
