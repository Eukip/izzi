import React from "react";
import DetailLeft from "./detailLeft/DetailLeft";
import DetailRight from "./detailRight/DetailRight";
import CouponsItem from "../couponsItem/CouponsItem";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import Modal from "./detailRight/modal/Modal";
import ModalNoAuth from "./detailRight/modal/ModalNoAuth";
import {useSelector, useDispatch} from "react-redux";
import {getQrCode} from "../../../store/actions/qrCode";
import izzi from "../../../adapters/axios.config";
import {useRouter} from "next/router";
import {AddCouponsToFavorite, removeCouponFromFavorite} from "../../../store/actions/favorite";

const CouponsDetail = (item) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [modalActive, setModalActive] = React.useState(false);
    const [modalNoAuthActive, setActiveNoAuthModal] = React.useState(false);
    const [color, setColor] = React.useState(true);
    const [like, setLike] = React.useState(true);
    const qrCode = useSelector(({qrCode}) => qrCode.qrCode);

    React.useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorite')) || []
        if (item.is_favorite === true) {
            setLike(false)
        }
        if (!!favorites.find(fav => fav.id === item.id)) {
            setLike(false)
        }
    }, [])


    const ActiveBtn = () => {
        if (!localStorage.getItem("access_token")) {
            setActiveNoAuthModal(true);
        } else {
            izzi
                .post(
                    "/coupons/buy/",
                    {coupon_id: item.id},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data) {
                        router.push(res.data.detail);
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
            setColor(false);
        }
    };
    const ActiveQrCode = () => {
        dispatch(getQrCode(item.id));
        setModalActive(true);
    }

    const ActiveLike = () => {
        const favorites = JSON.parse(localStorage.getItem('favorite')) || []
        if (!localStorage.getItem("access_token")) {
            if (!!favorites.find(fav => fav.id === item.id)) {
                localStorage.setItem("favorite", JSON.stringify(favorites.filter(fav => fav.id !== item.id)))
            } else {
                localStorage.setItem("favorite", JSON.stringify([...favorites, item]))
            }
            setLike(!like);
        } else {
            if (like === true) {
                dispatch(AddCouponsToFavorite(item.id));
                setLike(!like);
            } else {
                dispatch(removeCouponFromFavorite(item.id));
                setLike(!like);
            }
        }
    };

    const markers = item.map_locations;

    const styles = {
        width: "100%",
        height: "100%",
        style: "border:0",
        allowfullscreen: "",
        loading: "lazy",
    };

    return (
        <main className="detail-page">
            <div className="crumb">
                <div className="container">
                    <div className="crumb-list">
                        <a className="crumb-item" href="">
                            Главная
                        </a>
                        <span className="crumb-item">{item.company_name}</span>
                    </div>
                </div>
            </div>

            <div className="detail">
                <div className="container">
                    <div className="detail-side">
                        <DetailLeft {...item}/>
                        <DetailRight
                            {...item}
                            modalNoAuthActive={modalNoAuthActive}
                            setActiveNoAuthModal={setActiveNoAuthModal}
                            modalActive={modalActive}
                            ActiveBtn={ActiveBtn}
                            setModalActive={setModalActive}
                            color={color}
                            setColor={setColor}
                            ActiveLike={ActiveLike}
                            like={like}
                            ActiveQrCode={ActiveQrCode}
                            setActive={setModalActive}
                        />
                    </div>
                </div>
            </div>

            {
                modalActive ? (
                    <Modal
                        {...item}
                        active={modalActive}
                        setActive={setModalActive}
                        qrCode={qrCode}
                    />
                ) : null
            }
            <ModalNoAuth
                active={modalNoAuthActive}
                setActive={setActiveNoAuthModal}
            />
            <div className="coupons">
                <div className="container">
                    <h3 className="title-box">Похожие товары</h3>
                    <div className="coupons-list">
                        {item.similar_products?.map((item) => (
                            <CouponsItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="maps-box">
                <div className="container">
                    <div className="maps-column">
                        <div className="maps-left">
                            <YMaps style={styles}>
                                <div style={styles}>
                                    <Map
                                        style={styles}
                                        defaultState={{
                                            center: [42.87, 74.59],
                                            zoom: 11,
                                        }}
                                    >
                                        {markers?.map((item, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Placemark
                                                        style={styles}
                                                        modules={["geoObject.addon.balloon"]}
                                                        defaultGeometry={item.geolocation.split(",")}
                                                    />
                                                </React.Fragment>

                                            );
                                        })}
                                    </Map>
                                </div>
                            </YMaps>
                        </div>
                        <div className="maps-right">
                            {markers?.map((item, index) => (
                                <div className="item" key={index}>
                                    <div className="title">{item.address}</div>
                                    {item.phone_numbers?.map((itemNum) => (
                                        <>
                                            <a
                                                className="phone"
                                                href={`tel:  ${itemNum.phone_number}`}
                                            >
                                                {itemNum.phone_number}
                                            </a>
                                            <br/>
                                        </>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CouponsDetail;
