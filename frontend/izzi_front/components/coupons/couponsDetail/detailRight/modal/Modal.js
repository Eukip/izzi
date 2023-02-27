import React from "react";
import {useDispatch} from "react-redux";
import {fetchDetailCoupons} from "../../../../../store/actions/couponsDetail";
import {useRouter} from "next/router";


const Modal = ({
    id,
  qrCode,
  discount_percent,
  start_active_date,
  end_active_date,
  bought_quantity,
  description,
  active,
  setActive,
}) => {

  const dispatch = useDispatch()
  const router = useRouter()

  const sendRequestId = (e) => {
    setActive(false)
    dispatch(fetchDetailCoupons(id))
    if (typeof window !== 'undefined') {
      router.replace(router.asPath.split('?')[0])
    }
  }

  return (
    <div
      className={active ? "modal active" : "modal"}
      id="modal-1"
      aria-hidden="true"
    >
      <div tabIndex="-1" data-micromodal-close="">
        <div role="dialog" aria-modal="true" aria-labelledby="">
          <div
            className={active ? "modal__content active" : "modal__content "}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="close"
              aria-label="Close modal"
              data-micromodal-close=""
              onClick={(e) => sendRequestId(e)}
            >
              <img
                src="/svg/close.svg"
                className="close"
              />
            </div>
            <img src={qrCode?.qr_code_image} width="100%" />
            <div className="text">
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="help-msg pl104">
              <div className="help-msg-discount">{discount_percent} %</div>
              <div className="help-msg__span">Период действия акции:</div>
              <div className="help-msg__date">
                с {start_active_date} по {end_active_date}
              </div>
            </div>
            <div className="coupons-detail-info">
              <div className="coupons-detail__item">
                <img src="/svg/ticket.svg" />
                {bought_quantity} купонов купили
              </div>
              <div className="coupons-detail__item">
                <img src="/svg/wall-clock.svg" />
                Время продаж ограничено!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
