import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabLink, TabContent } from "react-tabs-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import styles from './styles.module.scss'

SwiperCore.use([Navigation, Thumbs]);

const DetailLeft = ({
  discount_percent,
  images,
  conditions,
  description,
  map_locations,
}) => {

  const [interactive, setInteractive] = useState({
    thumbsSwiper: null,
    showConditions: false,
    showDescription: false
  })

  const interactiveHandler = (key, value) =>{
    setInteractive({...interactive, [key]: value})
  }

  return (
    <div className="detail-left">
      <div className="discount">{discount_percent}%</div>
      <ul id="lightSlider">
        <li>
          <Swiper
            loop={true}
            navigation={true}
            thumbs={{ swiper: interactive.thumbsSwiper}}
            className="mySwiperTwo"
          >
            {images?.map((item, index) => (
              <SwiperSlide key={index}>
                <img className={styles.image} src={item.image}  alt="image of coupon"/>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={swiper => interactiveHandler('thumbsSwiper', swiper)}
            loop={true}
            spaceBetween={5}
            slidesPerView={7}
            freeMode={true}
            watchSlidesVisibility={true}
            watchSlidesProgress={true}
            className="mySwiper"
            breakpoints={{
              780: {
                slidesPerView: 7,
              },
              320: {
                slidesPerView: 4,
              },
              426: {
                slidesPerView: 5,
              },
            }}
          >
            {images?.map((item,index) => (
              <SwiperSlide key={index}>
                <img src={item.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </li>
      </ul>
      <Tabs className="tabs" id="tabs">
        <ul className="tabs-list">
          <li>
            <a>
              <TabLink to="tab1">Условия</TabLink>
            </a>
          </li>
          <li>
            <a>
              <TabLink to="tab2">Описание</TabLink>
            </a>
          </li>
          <li>
            <a>
              <TabLink to="tab3">Адреса</TabLink>
            </a>
          </li>
        </ul>
        <TabContent className="tabs-content" for="tab1">
          <div
            className={!interactive.showConditions ? "show-some" : ""}
            dangerouslySetInnerHTML={{ __html: conditions }}
          >

          </div>
          <p
            onClick={() => interactiveHandler("showConditions" , !interactive.showConditions)}
            className={`toggle-show`}
          >
            {interactive.showConditions ? "Свернуть" : "Показать полностью"}
          </p>
        </TabContent>
        <TabContent className="tabs-content" for="tab2">
          <div
            className={!interactive.showDescription ? "show-some" : ""}
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </div>
          <p
            onClick={() => interactiveHandler('showDescription', !interactive.showDescription)}
            className={`toggle-show`}
          >
            {interactive.showDescription ? "Свернуть" : "Показать полностью"}
          </p>
        </TabContent>

        <TabContent className="tabs-content" for="tab3">
          {map_locations?.map((item) => (
            <div>{item.address}</div>
          ))}
        </TabContent>
      </Tabs>
    </div>
  );
};

export default DetailLeft;
