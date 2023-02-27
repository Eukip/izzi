import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Link from "next/link";
import { TabContent, TabLink, Tabs } from "react-tabs-redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyStocks } from "../../../store/actions/coupons";
import ModalActivation from "./ModalActivation";
import axios from "axios";
import ModalSuccess from "./ModalSuccess";
import izzi from "../../../adapters/axios.config";

const MySharesComponent = () => {
  const active = "active";
  const activated = "activated";
  const expired = "expired";
  const dispatch = useDispatch();
  const items = useSelector(({ coupons }) => coupons.items);
  const [modalActivation, setModalActivation] = React.useState(false);
  const [modalSuccess, setModalSuccess] = React.useState(false);
  const [qrResult, setQrResult] = React.useState({
    result: "",
  });
  const [error, setError] = React.useState({
    text1: null,
    text2: null,
  });
  useEffect(() => {
    dispatch(fetchMyStocks(active));
  }, []);

  const onFetchMyCouponsActive = (arg) => {
    dispatch(fetchMyStocks(arg));
  };

  const handleScan = (data) => {
    if (data) {
      setQrResult({
        result: data,
      });
    }
    if (data === undefined) {
      setError({
        text2: "Попробуйте еще раз *",
      });
    }
  };
  const handleError = (err) => {
    console.error(err);
    setError({
      text2: "Попробуйте еще раз *",
    });
  };
  React.useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    if (qrResult.result) {
      izzi
        .get(qrResult.result, { headers })
        .then(function (response) {
          if (response.status === 200) {
            setModalActivation(false);
            setModalSuccess(true);
          }
        })
        .catch(function (error) {
          setError({
            text1: error.response.data.detail,
            text2: "Попробуйте еще раз *",
          });
        });
    }
  }, [qrResult.result]);
  return (
    <main className="my-shares background-grey">
      <div className="crumb">
        <div className="container">
          <div className="crumb-list">
            <Link href="/">
              <a className="crumb-item">Главная</a>
            </Link>
            <span className="crumb-item">Мои акции</span>
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
                  <h1 className="title-section">Мои акции</h1>
                  <div className="my-coupon__tabs">
                    <Tabs className="tabs" id="tabs-my-shares">
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

                      <TabContent
                        className="my-shares-tabs__content"
                        for="tab1"
                      >
                        <div className="my-shares__table">
                          <div className="my-shares__row">
                            <div className="title">Название акции</div>
                            <div className="quantity">Количество</div>
                            <div className="button-column"></div>
                          </div>
                          {items &&
                            items.results &&
                            items.results.map((item) => (
                              <div className="my-shares__row">
                                <div className="title">{item.title}</div>
                                <div className="quantity">
                                  {item.total_stocks}
                                </div>
                                <div className="button-column">
                                  <div
                                    className="button"
                                    onClick={() => setModalActivation(true)}
                                  >
                                    Активировать
                                  </div>
                                </div>
                              </div>
                            ))}
                          <ModalActivation
                            modalActivation={modalActivation}
                            setModalActivation={setModalActivation}
                            handleError={handleError}
                            handleScan={handleScan}
                            error={error}
                          />
                          <ModalSuccess
                            modalSuccess={modalSuccess}
                            setModalSuccess={setModalSuccess}
                          />
                        </div>
                      </TabContent>

                      <TabContent
                        className="my-shares-tabs__content"
                        for="tab2"
                      >
                        <div className="my-shares__table">
                          <div className="my-shares__row">
                            <div className="title">Название акции</div>
                            <div className="quantity">Количество</div>
                            <div className="button-column"></div>
                          </div>
                          {items &&
                            items.results &&
                            items.results.map((item) => (
                              <div className="my-shares__row">
                                <div className="title">{item.title}</div>
                                <div className="quantity">
                                  {item.total_stocks}
                                </div>
                                <div className="button-column">
                                  <div className="button active">
                                    Активирован
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabContent>
                      <TabContent
                        className="my-shares-tabs__content"
                        for="tab3"
                      >
                        <div className="my-shares__table">
                          <div className="my-shares__row">
                            <div className="title">Название акции</div>
                            <div className="quantity">Количество</div>
                            <div className="button-column"></div>
                          </div>

                          {items &&
                            items.results &&
                            items.results.map((item) => (
                              <div className="my-shares__row">
                                <div className="title">{item.title}</div>
                                <div className="quantity">
                                  {item.total_stocks}
                                </div>
                                <div className="button-column">
                                  <div className="button expired">Истек</div>
                                </div>
                              </div>
                            ))}
                        </div>
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

export default MySharesComponent;
