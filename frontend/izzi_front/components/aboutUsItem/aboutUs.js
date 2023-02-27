import React,{useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import Link from "next/link";
import SideBarLeftSide from "../../pages/sideBarLeftSide";
import { fetchAboutUs } from "../../store/actions/aboutUs";


const AboutUsItem = ({description}) => {
    const dispatch = useDispatch();
    const items = useSelector(({aboutUs}) => aboutUs.items );
    const isLoaded = useSelector(({aboutUs}) => aboutUs.isLoaded);

    useEffect(() => {
        dispatch(fetchAboutUs())
    },[]);
    return (
        <main className="home-page">
            <div className="about-us__page background-grey">
                <div className="crumb">
                    <div className="container">
                        <div className="crumb-list">
                            <Link href="/">
                                <a className="crumb-item">
                                    Главная
                                </a>
                            </Link>
                            <span className="crumb-item">О нас</span>
                        </div>
                    </div>
                </div>
                <div className="about-us__wrapper">
                    <div className="container">
                        <div className="about-us__content" id="tabs-about-us">
                            <SideBarLeftSide />
                            <div className="about-us__right">
                                <div className="about-us__right-inner">
                                    <div className="about-us__description" id="tab-about-us-3">
                                        <h3 className="title-box">О нас</h3>
                                        <div className="text">
                                            {items.description}
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

export default AboutUsItem;