import Link from "next/link";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchNetworks} from "../store/actions/contact";
import {logOutAuth} from "../store/actions/userAuth";

const SideBarLeftSide = () => {
  const dispatch = useDispatch();
  const [tokenPartner, setTokenPartner] = useState("");

  const userAuth = useSelector(({ userAuthReducer: { data }}) => data);
  const [name, setName] = useState('')
  const [loginUser, setLoginUser] = useState("");


  const getOut = () => {
    dispatch(logOutAuth(localStorage.clear()));
    setTokenPartner('')
    setLoginUser('')
  }

  useEffect(() => {
    dispatch(fetchNetworks());
    const token = localStorage.getItem("access_token");
    setTokenPartner(token);
    setName(localStorage.getItem('first_name'))
  }, [userAuth]);

  return (
    <div className="about-us__left">
      <div className="about-us__left-inner">
        <ul className="about-us__links wrapper-for-main-icon">
          <li>
            <Link href="/about-us">
              <a className="personal-area">О нас</a>
            </Link>
          </li>
          <li>
            <Link href="/contact-page">
              <a className="contacts">Контакты</a>
            </Link>
          </li>
          <li>
            <Link href="/help-page">
              <a className="personal-area">Помощь</a>
            </Link>
          </li>
          {tokenPartner ?  <li>
            <a className="exit" onClick={getOut}>Выйти из аккаунта</a>
          </li> : null}
        </ul>
      </div>
    </div>
  );
};

export default SideBarLeftSide;
