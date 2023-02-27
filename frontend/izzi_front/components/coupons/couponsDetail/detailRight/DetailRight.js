import Link from "next/link";
import React, {useEffect, useState} from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  VKShareButton,
  VKIcon,
  FacebookIcon,
  OKShareButton,
  OKIcon,
  TelegramShareButton,
  TelegramIcon
} from "react-share";
import {useRouter} from "next/router";
import ModalWindowRejected from "../../../profile/partner/ModalWindowRejected";


const DetailRight = ({
                       title,
                       is_bought,
                       discount_percent,
                       price,
                       old_price,
                       start_active_date,
                       end_active_date,
                       bought_quantity,
                       company_logo,
                       price_for_coupon,
                       company_name,
                       company_id,
                       like,
                       ActiveLike,
                       ActiveBtn,
                       ActiveQrCode,
                     }) => {

  const [path, setPath] = useState(null);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) setPath(window.location.href);

    if (Object.keys(router.query).includes('pg_order_id')) {
      if (is_bought) {
        setModal({type: 'success', text: 'Cпасибо за покупку'})
      } else {
        setModal({type: 'error', text: 'Ошибка. Повторите еще раз.'})
      }
    }
  }, [router.query.pg_order_id, is_bought]);

  const couponToggleButton = () => {
    return (
      <div className="btn-bye"  style={{marginRight:"0"}} onClick={() => ActiveBtn()}>
        Купить купон
      </div>
    );
  };

  return (
    <>
      {modal ?
        (
          <ModalWindowRejected
            type={modal.type}
            text={modal.text}
            closeModal={() => setModal(false)}
          />
        )
        : null}
      <div className="detail-right">
        <div className="store-card">
          <div className="store-image">
            <img src={company_logo}/>
          </div>
          <Link href={`/company/[id]`} as={`/company/${company_id}`}>
            <div className="store-name">{company_name}</div>
          </Link>
        </div>
        <div className="detail-coupon-info">
          <div className="discount-title">
            Купон на скидку {discount_percent}%
          </div>

          <div className="discount-text">
            <p dangerouslySetInnerHTML={{__html: title}}/>
          </div>
        </div>
        <div className={"detail-price-wrapper"}>
          <div className={"detail-price-wrapper__inner_wrapper"}>
            <p className={"detail-price-wrapper__inner_wrapper__text"}>
              Цена c купоном:
            </p>
            <div className="detail-price">
              <div className="new-price">{price} сом</div>
              <div className="old-price">{old_price} сом</div>
            </div>
          </div>
          <div className={"detail-price-wrapper__inner_wrapper"}>
            <p className={"detail-price-wrapper__inner_wrapper__text"}>
              Цена за купон:
            </p>
            <div className="detail-price first">
              <div className="new-price">{price_for_coupon} сом</div>
            </div>
          </div>
        </div>
        <div className="detail-action">
          {router.query.pg_order_id || is_bought &&
          <div className="btn-bye active" onClick={() => ActiveQrCode()}>
            Активировать купон
          </div>
          }
          <div style={{display:"flex", marginTop:"12px", position:"relative", width:"100%", marginRight:"0"}}>
            {couponToggleButton()}
            <div
              className={like ? "btn-favorite " : "btn-favorite active"}
              onClick={() => ActiveLike()}
              style={{position:"absolute", right:"-80px"}}
            >
              <img src="/svg/favorite-outline.svg" alt=""/>
            </div>
          </div>

        </div>
        <div className="help-msg">
          <div className="help-msg__span">Период действия акции:</div>
          <div className="help-msg__date">
            <span className="activate_date_start">с {start_active_date}</span> по {end_active_date}
          </div>
        </div>
        <div className="coupons-detail-info">
          <div className="coupons-detail__item">
            <img src="/svg/ticket.svg"/>
            {bought_quantity} купонов купили
          </div>
          <div className="coupons-detail__item">
            <img src="/svg/wall-clock.svg"/>
            Время продаж ограничено!
          </div>
        </div>
        <div className="share">
          <div className="share-title">Поделиться</div>
          <div className="share-link">
            <VKShareButton url={path}>
              <VKIcon>
                <a
                  className="coupon_vkontakte"
                  style={{width: "36px", height: "36px"}}
                >
                </a>
              </VKIcon>
            </VKShareButton>
            <FacebookShareButton url={path}>
              <FacebookIcon>
                <a
                  className="coupon_facebook"
                  style={{width: "36px", height: "36px"}}

                >
                </a>
              </FacebookIcon>
            </FacebookShareButton>
            <OKShareButton url={path}>
              <OKIcon>
                <a
                  className="coupon_odnoklassniki"
                  style={{width: "36px", height: "36px"}}
                >
                </a>
              </OKIcon>
            </OKShareButton>
            <WhatsappShareButton url={path}>
              <WhatsappIcon>
                <a
                  className="coupon_whats-app"
                  style={{width: "36px", height: "36px"}}
                >
                </a>
              </WhatsappIcon>
            </WhatsappShareButton>
            <TelegramShareButton url={path}>
              <a
                className="coupon_telegram"
                style={{width: "36px", height: "36px"}}
              >
              </a>
            </TelegramShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRight;
