import React from "react";
import CouponsItem from "../../coupons/couponsItem/CouponsItem";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import { Map, Placemark, YMaps } from "react-yandex-maps";
const ContentTabs = (item) => {
    const [active, setActive] = React.useState(true);
    const changeActive = () => {
        setActive(!active);
    };

    const styles = {
        width: "100%",
        height: "100%",
        style: "border:0",
        allowfullscreen: "",
        loading: "lazy",
    };
    return (
        <div className="promoter-tabs">
            <Tabs
                className="tabs"
                id="tabs-promoter"
                // handleSelect={this.props.changeSelectedTab}
                // selectedTab={this.props.tabs}
            >
                <ul className="tabs-list" onClick={changeActive}>
                    <li>
                        <a className={active ? "active" : null}>
                            <TabLink to="tab1">Акции</TabLink>
                        </a>
                    </li>
                    <li>
                        <a className={!active ? "active" : null}>
                            <TabLink to="tab2">Контакты</TabLink>
                        </a>
                    </li>
                </ul>
                <TabContent className="tabs-content" for="tab1">
                    <h3 className="title-box">Акции</h3>
                    <div className="coupons-list">
                        {item.coupons?.map((item) => (
                            <CouponsItem {...item} />
                        ))}
                    </div>
                </TabContent>
                <TabContent for="tab2">
                    <div className="promoter-contacts__content">
                        <h3 className="title-box">Контакты</h3>
                        <p className="description">{item.description}</p>
                        <div className="promoter-contacts">
                            <div className="contacts-block">
                                <h4>Наши телефоны:</h4>
                                <div className="links">
                                    {item.phone1 &&
                                        <a
                                            className="phone"
                                            href={`tel: ${item.phone1}`}
                                        >
                                            {item.phone1}
                                        </a>
                                    }
                                    {item.phone2 &&
                                        <a
                                            className="phone"
                                            href={`tel: ${item.phone2}`}
                                        >
                                            {item.phone2}
                                        </a>
                                    }
                                    {item.phone3 &&
                                        <a
                                            className="phone"
                                            href={`tel: ${item.phone3}`}
                                        >
                                            {item.phone3}
                                        </a>

                                    }

                                </div>
                            </div>
                            <div className="contacts-block email-block">
                                <div className="links-wrapper">
                                    <h4>Email:</h4>
                                    <div className="links">
                                        {item.email &&
                                            <a className="email" href={item.email}>
                                                {item.email}
                                            </a>
                                        }

                                    </div>
                                </div>
                                <div className="links-wrapper">
                                    <h4>Наш адрес:</h4>
                                    <div className="links">
                                        {item.address &&
                                            <a className="address" href={item.address}>
                                                г. Бишкек, пр-т Манаса, д. 5
                                            </a>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="contacts-block">
                                <h4>Мы в социальных сетях: </h4>
                                <div className="links">
                                    {item.network && item.network.facebook &&
                                        <a className="facebook" href={item.network.facebook}>
                                            Facebook
                                            </a>
                                    }
                                    {item.network && item.network.instagram &&
                                        <a className="insta" href={item.network.instagram}>
                                            Instagram
                                        </a>
                                    }
                                    {item.network && item.network.vkontakte &&
                                        <a className="vk" href="">
                                            VKontakte
                                        </a>
                                    }
                                    {item.network && item.network.odnoklassniki &&
                                        <a className="ok" href="">
                                            Odnoklassniki
                                        </a>
                                    }


                                </div>
                            </div>
                        </div>

                        <div className="map">
                            <YMaps style={styles}>
                                <div style={styles}>
                                    <Map
                                        style={styles}
                                        defaultState={{
                                            center: [42.87, 74.59],
                                            zoom: 9,
                                        }}
                                    >
                                        {item.coordinates?.map((item) => {
                                            return (
                                                <Placemark
                                                    style={styles}
                                                    modules={[
                                                        "geoObject.addon.balloon",
                                                    ]}
                                                    defaultGeometry={item.geolocation.split(",")}
                                                />
                                            );
                                        })}
                                    </Map>
                                </div>
                            </YMaps>
                        </div>

                    </div>
                </TabContent>
            </Tabs>
        </div>
    );
};

export default ContentTabs;
