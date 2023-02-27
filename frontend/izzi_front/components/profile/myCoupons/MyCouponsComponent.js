import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import Link from "next/link";
import {
  fetchMoreCoupons,
  fetchMoreCouponsMe,
  fetchMyCouponsActive,
} from "../../../store/actions/coupons";
import CouponsItem from "../../coupons/couponsItem/CouponsItem";
import { useDispatch, useSelector } from "react-redux";

const MyCouponsComponent = () => {
  const active = "active";
  const activated = "activated";
  const expired = "expired";
  const dispatch = useDispatch();
  const items = useSelector(({ coupons }) => coupons.items);
  const currentPage = useSelector(({ coupons }) => coupons.currentPage);
  useEffect(() => {
    dispatch(fetchMyCouponsActive(active));
  }, []);

  const onFetchMyCouponsActive = (arg) => {
    dispatch(fetchMyCouponsActive(arg));
  };
  const moreCouponsHandler = (arg) => {
    dispatch(
      fetchMoreCouponsMe({
        currentPage: currentPage + 1,
        arg: arg,
      })
    );
  };

  return (
    <main className="my-coupon background-grey">
      <div className="crumb">
        <div className="container">
          <div className="crumb-list">
            <Link href="/">
              <a className="crumb-item">Главная</a>
            </Link>
            <span className="crumb-item">Новые купоны</span>
          </div>
        </div>
      </div>
      <div className="about-us__wrapper">
        <div className="container">
          <div className="about-us__content">
            <Sidebar />
            <div className="about-us__right">
              <div className="about-us__right-inner">
                <div className="my-coupon__content">
                  <h1 className="title-section">Мои купоны</h1>
                  <div className="my-coupon__tabs">
                    <Tabs className="tabs" id="tabs-my-coupon">
                      <ul className="tabs-list">
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            onFetchMyCouponsActive(active);
                          }}
                        >
                          <TabLink to="tab1">Активные</TabLink>
                        </li>
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            onFetchMyCouponsActive(activated);
                          }}
                        >
                          <TabLink to="tab2">Активированные</TabLink>
                        </li>
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            onFetchMyCouponsActive(expired);
                          }}
                        >
                          <TabLink to="tab3">Истекшие</TabLink>
                        </li>
                      </ul>
                      <TabContent className="tabs-content" for="tab1">
                        <div className="coupons-list">
                          {items &&
                            items.results &&
                            items.results.map((item) => (
                              <CouponsItem {...item} key={item.id} />
                            ))}
                        </div>
                        {items.count !== items.results.length ? (
                          <div className="coupons-show-more">
                            <a
                              className="btn-load-more"
                              onClick={() => moreCouponsHandler(active)}
                            >
                              Посмотреть еще
                            </a>
                          </div>
                        ) : (
                          <div className="coupons-show-more">
                            <a className="btn-load-more">Посмотреть еще</a>
                          </div>
                        )}
                      </TabContent>
                      <TabContent className="tabs-content" for="tab2">
                        <div className="coupons-list">
                          {items &&
                            items.results &&
                            items.results.map((item) => (
                              <CouponsItem {...item} key={item.id} />
                            ))}
                        </div>
                        {items.count !== items.results.length ? (
                          <div className="coupons-show-more">
                            <a
                              className="btn-load-more"
                              onClick={() => moreCouponsHandler(activated)}
                            >
                              Посмотреть еще
                            </a>
                          </div>
                        ) : (
                          <div className="coupons-show-more">
                            <a className="btn-load-more">Посмотреть еще</a>
                          </div>
                        )}
                      </TabContent>
                      <TabContent className="tabs-content" for="tab3">
                        <div className="coupons-list">
                          {items &&
                            items.results &&
                            items.results.map((item) => (
                              <CouponsItem {...item} key={item.id} />
                            ))}
                        </div>
                        {items.count !== items.results.length ? (
                          <div className="coupons-show-more">
                            <a
                              className="btn-load-more"
                              onClick={() => moreCouponsHandler(expired)}
                            >
                              Посмотреть еще
                            </a>
                          </div>
                        ) : (
                          <div className="coupons-show-more">
                            <a className="btn-load-more">Посмотреть еще</a>
                          </div>
                        )}
                      </TabContent>
                    </Tabs>
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

export default MyCouponsComponent;
