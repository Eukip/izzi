import React, {useEffect} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {fetchRequisites} from "../../store/actions/requisites";

const Requisites = ({title,description}) => {
    const dispatch = useDispatch();
    const requisitesItems = useSelector(({requisites}) => requisites.requisitesItems );
    const isLoading = useSelector(({requisites}) => requisites.isLoading);


    useEffect(() => {
        dispatch(fetchRequisites())
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
                            <span className="crumb-item">Реквизиты</span>
                        </div>
                    </div>
                </div>
                <div className="about-us__wrapper">
                    <div className="container">
                        <div className="about-us__content" id="tabs-about-us">
                            <div className="about-us__right">
                                <div className="about-us__right-inner">
                                    <div className="about-us__description" id="tab-about-us-3">
                                        <h3 className="title-box" dangerouslySetInnerHTML={{ __html: requisitesItems.title }}></h3>
                                        <div className="text" dangerouslySetInnerHTML={{ __html: requisitesItems.description }}>
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

export default Requisites;
