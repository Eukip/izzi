import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchNetworks} from "../../store/actions/contact";
import Link from "next/link";
import React from "react";

export function Footer({vkontakte,odnoklassniki,phone1,app_store,play_market,email,facebook,instagram}) {
  const dispatch = useDispatch();
  const itemsPhone = useSelector(({ contacts }) => contacts.itemsPhone);
  const isLoaded = useSelector(({ contacts }) => contacts.isLoaded);

  useEffect(() => {
    dispatch(fetchNetworks());
  }, []);
    return (
        <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-content__inner">
            <div className="block-for-links">
              <h3> Покупателям</h3>
              <ul className="links">
                <Link href="/make-order">
                  <li><a>Как сделать заказ</a></li>
                </Link>
                <Link href="/payment-ways">
                  <li><a>Способы оплаты</a></li>
                </Link>
                <Link href="/answer-questions">
                  <li><a>Вопросы и ответы</a></li>
                </Link>
                <Link href="/public-offer">
                  <li><a>Публичная оферта</a></li>
                </Link>
                <Link href="/privacy-policy">
                  <li><a>Политика <br/>
                    конфиденциальности</a></li>
                </Link>
              </ul>
            </div>
            <div className="block-for-links">
              <h3> Компания</h3>
              <ul className="links">
                <Link href="/about-us">
                  <li><a>О нас</a></li>
                </Link>
                <Link href="/contact-page">
                  <li><a>Контакты</a></li>
                </Link>
                <Link href="/requisites">
                  <li><a>Реквизиты </a></li>
                </Link>
              </ul>
            </div>
            <div className="block-for-links">
              <h3> Мы в соц сетях</h3>
              <ul className="links social-links">
                <li><a className="vk" href={itemsPhone.vkontakte}>Вконтакте</a></li>
                <li><a className="facebook" href={itemsPhone.facebook}>Facebook</a></li>
                <li><a className="odnoklassniki" href={itemsPhone.odnoklassniki}>Одноклассники</a></li>
                <li><a className="instagram" href={itemsPhone.instagram}>Instagram</a></li>
              </ul>
            </div>
            <div className="block-for-links">
              <h3> Свяжитесь с нами</h3>
              <ul className="links social-links">
                <li><a className="email" href="mailto:izzi.bishkek@gmail.com">{itemsPhone.email}</a></li>
                <li><a className="phone"href={`tel: ${phone1}`}>{itemsPhone.phone1}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-info">
        <div className="container">
          <div className="text"><span>Разработка сайтов и мобильных приложений</span><Link href={"https://sunrisestudio.pro/ru/"}><a target="_blank">www.sunrisestudio.pro 2020</a></Link></div>
        </div>
      </div>
    </footer>
    );
}
