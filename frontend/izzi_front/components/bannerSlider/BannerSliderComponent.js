import React, {useEffect} from "react";

import {Swiper, SwiperSlide} from "swiper/react";
import {useDispatch, useSelector} from "react-redux";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import "swiper/components/navigation/navigation.min.css";
import SwiperCore, {Navigation, Pagination} from "swiper/core";
import {fetchBannerSlider} from "../../store/actions/bannerSlider";
import styles from './styles.module.scss'

SwiperCore.use([Pagination, Navigation]);

const BannerSliderComponent = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(({bannerSlider}) => bannerSlider);

  useEffect(() => {
    dispatch(fetchBannerSlider())
  },[]);

  return (
    <div className="banner">
      <div className="container">
        <div className="banner-slider">
          <>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination = {{
                  el: '.banner-pagination-first',
                  clickable: true,
              }}
              navigation={true}
              className="mySwiper"
            >
              {!!items && items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className={styles.carouselItem}>
                      <img src={item.image} key={item.id}/>
                    </div>
                  </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination banner-pagination-first">
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default BannerSliderComponent;

