import React, {useEffect} from "react";
import BannerCarouselComponent from "../components/bannerCarousel/BannerCarouselComponent";
import BannerSliderComponent from "../components/bannerSlider/BannerSliderComponent";
import CouponsLoading from "../components/coupons/couponsItem/CouponsLoading";
import {MainLayout} from "../components/MainLayout";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {fetchTrendCoupons} from "../store/actions/coupons";
import CouponsItem from "../components/coupons/couponsItem/CouponsItem";
import {useRouter} from "next/router";
import {ADD_COUPON_TO_FAVORITE} from "../store/constants/constants";
import styles from "../components/header/styles.module.scss";
import classNames from "classnames";

export default function Home() {
    const items = useSelector(({ coupons }) => coupons.items);
    const isLoaded = useSelector(({ coupons }) => coupons.isLoaded);
    const dispatch = useDispatch();
    const categories = useSelector(({categories: {data}}) => data)
    const router = useRouter()

    const handleAddCouponToFavorite = (item) => {
        dispatch({
            type: ADD_COUPON_TO_FAVORITE,
            payload: item,
        });
    };

    useEffect(()=>{
        dispatch(fetchTrendCoupons())
    }, [])

    const onClickCategory = (e, title, category, id) => {

        e.stopPropagation()

        router.push({
            pathname: "/category/[id]",
            query: {id, title, category: category}
        })
    }

    return(
        <MainLayout title="IZZZI">
            <main className="home-page">
                <div className={classNames("container", styles.icons)}>
                    {
                        categories && categories[0].subcategories.map(({title, icon, id, subcategories}, index) => {
                            return <div onClick={e => onClickCategory(e, title, "subcategory", id)} key={index}>
                                <img src={icon} alt="category"/>
                                <p>{title}</p>
                            </div>
                        })
                    }
                </div>
                <div className="coupons">
                    <div className="container">
                        <h3 className="title-box">Горящие скидки</h3>
                        <div className="coupons-list">
                            {isLoaded
                                ? items.results.map((item) => (
                                    <CouponsItem
                                        onCLickAddCoupon={handleAddCouponToFavorite}
                                        key={item.id}
                                        {...item}
                                    />
                                ))
                                : Array(8)
                                    .fill(0)
                                    .map((_, index) => <CouponsLoading key={index} />)}
                        </div>
                        <div className="coupons-show-more">
                            <Link href={"/coupons"}>
                                <a className="btn-load-more">
                                    Посмотреть все
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <BannerSliderComponent />
                <BannerCarouselComponent />
            </main>
        </MainLayout>
    )
}

