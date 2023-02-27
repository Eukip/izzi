import React, { useEffect } from "react";
import Link from "next/link";
import SideBarLeftSide from "../../pages/sideBarLeftSide";
import TextHelpPage from "./textHelpPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchHelpAnswers } from "../../store/actions/help";

const HelpPageItem = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ helpAnswers }) => helpAnswers.items);
  const isLoaded = useSelector(({ helpAnswers }) => helpAnswers.isLoaded);
  useEffect(() => {
    dispatch(fetchHelpAnswers());
  }, []);

  return (
    <main className="home-page">
      <main className="about-us__page background-grey">
        <div className="crumb">
          <div className="container">
            <div className="crumb-list">
              <Link href="/">
                <a className="crumb-item">Главная</a>
              </Link>
              <span className="crumb-item">Помощь</span>
            </div>
          </div>
        </div>
        <div className="about-us__wrapper">
          <div className="container">
            <div className="about-us__content" id="tabs-about-us">
              <SideBarLeftSide />
              <div className="about-us__right">
                <div className="about-us__right-inner">
                  <div className="help-content" id="tab-about-us-1">
                    <h3 className="title-box">Помощь</h3>
                    <div className="about-us__accordion-wrapper">
                      {isLoaded
                          ? items.map((item) => (
                              <TextHelpPage
                                  {...item}
                              />
                          ))
                          : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
};

export default HelpPageItem;
