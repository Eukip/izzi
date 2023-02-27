import React, {useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchBannerCarousel} from "../../store/actions/bannerCarousel";
import styles from './styles.module.scss'

SwiperCore.use([Pagination, Navigation]);



const BannerCarouselComponent = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(({bannerCarousel}) => bannerCarousel);

  useEffect(() => {
    dispatch(fetchBannerCarousel())
  },[]);
  return (
    <div className="banner">
      <div className="container">
        <div className="banner-carousel">
          <>
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              slidesPerGroup={1}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination = {{
              el: '.banner-pagination-second',
              clickable: true,
            }}
              navigation={true}
              className="mySwiper"
              breakpoints={{
                780: {

                  slidesPerView: 3,
                },
                426: {

                  slidesPerView: 2,
                },
                320: {

                  slidesPerView: 1,
                }
              }}
            >
                  {!!items && items.map((item, index) => (
                      <SwiperSlide key={index}>
                          <div className={styles.carouselItem} key={item.id}>
                              <img src={item.image}/>
                          </div>
                      </SwiperSlide>
                  ))}
            </Swiper>
            <div className="swiper-pagination banner-pagination-second">

            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default BannerCarouselComponent;
