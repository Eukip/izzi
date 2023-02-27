import Link from "next/link";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNetworks } from "../../store/actions/contact";
import { fetchSearchBar } from "../../store/actions/searchBar";
import izzi from "../../adapters/axios.config";
import { useRouter } from "next/router";
import { logOutAuth } from "../../store/actions/userAuth";
import searchModule from "/styles/search/searchDropdown.module.scss";
import styles from './HeaderSearch.module.scss';


const HeaderDesktop = ({ phone1 }) => {
  const dispatch = useDispatch();
  const itemsPhone = useSelector(({ contacts }) => contacts.itemsPhone);
  const [tokenPartner, setTokenPartner] = React.useState("");
  const [loginUser, setLoginUser] = React.useState("");
  const [searchData, setSearchData] = React.useState("");
  const [searchSupply, setSearchSupply] = React.useState([])
  const [showSearch, setShownSearch] = React.useState(false)
  const router = useRouter();
  const userAuth = useSelector(({ userAuthReducer: { data } }) => data);
  const [name, setName] = React.useState("");
  const searchRef = React.useRef(null);

  const getOut = () => {
    dispatch(logOutAuth(localStorage.clear()));
    setTokenPartner("");
    setLoginUser("");
  };

  React.useEffect(() => {
    dispatch(fetchNetworks());
    const token = localStorage.getItem("access_token");
    setTokenPartner(token);
    setName(localStorage.getItem("first_name"));
  }, [userAuth]);

  React.useEffect(() => {
    const outsideClicker = ({ target }) => {
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShownSearch(false);
      }
    };
    document.addEventListener('click', outsideClicker);
    return () => {
      document.removeEventListener('click', outsideClicker);
    }
  }, [searchRef]);

  const handleSearchChange = e => {
    setSearchData(e.target.value)
    izzi.get('/coupons/search-text', {
      params: {
        name: e.target.value.replace(' ', '+') || ''
      }
    })
        .then(response => {
          setSearchSupply(response.data)
        })
        .catch(err => {
          console.log(err)
        })
  }

  const handleSearchSupply = supply => {
    dispatch(fetchSearchBar(supply))
    setShownSearch(false)
    router.push({
      pathname: `/search-result`,
      query: { search: searchData },
    });
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSearchBar(searchData));
    router.push({
      pathname: `/search-result`,
      query: { search: searchData },
    });
  };

  return (
    <div className="header-desktop">
      <div className="top-header">
        <div className="container">
          <div className="top-header_flex">
            <div className="top-side_left">
              <Link href="/about-us">
                <a>О нас</a>
              </Link>
              <Link href="/help-page">
                <a>Помощь</a>
              </Link>
              <Link href="/contact-page">
                <a>Контакты</a>
              </Link>
            </div>
            <div className="top-side_right">
              <div className="top-side-phone">
                <span>Тел. для справки:</span>
                <a href={`tel: ${phone1}`}>{itemsPhone.phone1}</a>
              </div>
              <div className="line"></div>
              {tokenPartner ? (
                <Link href="/partner">
                  <a className="top-side-btn">Стать партнером</a>
                </Link>
              ) : (
                <Link href="/signin">
                  <a className="top-side-btn">Стать партнером</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="header-flex">
          <Link href="/">
            <a className="header-logo">
              <img src="/svg/logo.svg" />
            </a>
          </Link>
          <div className="header-search" ref={searchRef}>
            <form
              className="header-form"
              onSubmit={(e) => handleSearchSubmit(e)}
            >
              <input
                className="header-input"
                type="text"
                placeholder="Поиск"
                onChange={(e) => handleSearchChange(e)}
                value={searchData}
                onFocus={() => setShownSearch(true)}
              />
              {
                showSearch && searchSupply.length ? <div className={searchModule.header_search_supply}>
                  {
                    searchSupply.map((item, index) => {
                      return <div onClick={() => handleSearchSupply(item.title)}
                                  className={searchModule.search_supply} key={index}>{item.title}</div>
                    })
                  }
                </div> : null
              }
              <button
                className="header-button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: `/search-result`,
                    query: { search: searchData },
                  });
                }}
              > </button>
              <div className="search-result">
                <div className="search-result__inner"/>
              </div>
            </form>
          </div>
          <div className="header-links">
            <Link href={"/favorite"}>
              <a className="header-link favorite">Избранное</a>
            </Link>
            <div className="line"/>
            {tokenPartner ? (
              <Link href={"/my-coupons"}>
                <a className="header-link coupon">Мои купоны</a>
              </Link>
            ) : (
              <Link href="/signin">
                <a className="header-link coupon">Мои купоны</a>
              </Link>
            )}

            <div className="line"/>
            <div className="header-profile">
              {!tokenPartner ? (
                <Link href={"/signin"}>
                  <div className={styles.headerAuth}>
                    <a className="header-link sign-in">
                      <img src="/svg/header-sign-in.svg" alt=""/>
                      Войти</a>
                  </div>
                </Link>
              ) : (
                <div className={styles.headerLogged}>
                  <a
                    onClick={() => setLoginUser(!loginUser)}
                    className={
                      loginUser
                        ? "header-link sign-in active"
                        : "header-link sign-in "
                    }
                  >
                    <img src="/svg/user.svg" alt=""/>
                    {name}
                  </a>
                  <div
                    className="profile-dropdown"
                    style={{ display: loginUser ? "block" : "none" }}
                  >
                    <div className="profile-dropdown__inner">
                      <ul className="about-us__links wrapper-for-main-icon">
                        <Link href={"/profile"}>
                          <li>
                            <a className="personal-area">Профиль</a>
                          </li>
                        </Link>
                        <Link href={"/partner"}>
                          <li>
                            <a className="partner">Страница партнера</a>
                          </li>
                        </Link>
                        <Link href={"/shares"}>
                          <li>
                            <a className="promotions">Мои акции</a>
                          </li>
                        </Link>
                        <Link href={"/my-coupons"}>
                          <li>
                            <a className="coupon">Мои купоны</a>
                          </li>
                        </Link>
                        <Link href={"/change-number"}>
                          <li>
                            <a className="phone">Сменить номер</a>
                          </li>
                        </Link>
                        <Link href={"/change-password"}>
                          <li>
                            <a className="password">Сменить пароль</a>
                          </li>
                        </Link>
                        <Link href={"/"}>
                          <li>
                            <a className="exit" onClick={() => getOut()}>
                              Выйти из аккаунта
                            </a>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderDesktop;
