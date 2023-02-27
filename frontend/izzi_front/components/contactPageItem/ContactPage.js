import React, { useEffect } from "react";
import Link from "next/link";
import SideBarLeftSide from "../../pages/sideBarLeftSide";
import { useSelector, useDispatch } from "react-redux";
import { fetchNetworks } from "../../store/actions/contact";
import ContactPageItem from "./ContactPageItem";
import {fetchAboutMap} from "../../store/actions/aboutMap";
import ContactPageMap from "./ContactPageMap";



const ContactPage = () => {
  const dispatch = useDispatch();

  const items = useSelector(({ contacts }) => contacts.itemsPhone);
  const isLoaded = useSelector(({ contacts }) => contacts.isLoaded);

  useEffect(() => {
    dispatch(fetchNetworks());
  }, []);

  const mapItems = useSelector(({ aboutMap }) => aboutMap.mapItems);
  const isLoading = useSelector(({ aboutMap }) => aboutMap.isLoading);
  useEffect(() => {
    dispatch(fetchAboutMap());
  }, []);

  return (
    <main className="home-page">
      <div className="about-us__page background-grey">
        <div className="crumb">
          <div className="container">
            <div className="crumb-list">
              <Link href="/">
                <a className="crumb-item">Главная</a>
              </Link>
              <span className="crumb-item">Контакты</span>
            </div>
          </div>
        </div>
        <div className="about-us__wrapper">
          <div className="container">
            <div className="about-us__content" id="tabs-about-us">
              <SideBarLeftSide />
              <div className="about-us__right">
                <div className="about-us__right-inner">
                  <div
                    className="promoter-contacts__content"
                    id="tab-about-us-2"
                  >
                    {isLoaded ? <ContactPageItem {...items} /> : null}
                  </div>
                  <ContactPageMap/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
