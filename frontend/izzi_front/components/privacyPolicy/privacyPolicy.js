import React, {useEffect} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {fetchPrivacyPolicy} from "../../store/actions/privacyPolicy";

const PrivacyPolicy = ({title, description}) => {
  const dispatch = useDispatch();
  const privacyItems = useSelector(({privacyPolicy}) => privacyPolicy.privacyItems );
  const isLoading = useSelector(({privacyPolicy}) => privacyPolicy.isLoading);

  useEffect(() => {
    dispatch(fetchPrivacyPolicy())
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
              <span className="crumb-item">Политика конфиденциальности</span>
            </div>
          </div>
        </div>
        <div className="about-us__wrapper">
          <div className="container">
            <div className="about-us__content" id="tabs-about-us">
              <div className="about-us__right">
                <div className="about-us__right-inner">
                  <div className="about-us__description" id="tab-about-us-3">
                    <h3 className="title-box" dangerouslySetInnerHTML={{ __html: privacyItems.title }}></h3>
                    <div className="text" dangerouslySetInnerHTML={{ __html: privacyItems.description }}></div>
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

export default PrivacyPolicy;
