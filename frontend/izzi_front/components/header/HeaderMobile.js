import * as React from "react";
import Link from "next/link";
import {useSelector, useDispatch} from "react-redux";
import { useRouter } from "next/router";

import izzi from "../../adapters/axios.config";
import searchModule from "/styles/search/searchDropdown.module.scss";
import { fetchSearchBar } from "../../store/actions/searchBar";
import { logOutAuth } from "../../store/actions/userAuth";
import { fetchNetworks } from "../../store/actions/contact";
import {
  fetchAllCoupons,
  fetchSubCategoryCoupons,
  fetchSubSubCategoryCoupons,
} from "../../store/actions/coupons";


const HeaderMobile = () => {
  const items = useSelector(({categories: {data}}) => data ?? []);
  const userAuth = useSelector(({userAuthReducer: {data}}) => data);
  const itemsPhone = useSelector(({contacts}) => contacts.itemsPhone);

  const [openSearch, setOpenSearch] = React.useState(false);
  const [tokenPartner, setTokenPartner] = React.useState("");
  let [openBurgerMenu, setOpenBurgerMenu] = React.useState(false);
  let [showCategories, setShowCategories] = React.useState(false);
  const [subCategory, setSubCategoryIndex] = React.useState(false);
  const [loginUser, setLoginUser] = React.useState("");
  const [name, setName] = React.useState("");
  const [searchData, setSearchData] = React.useState("");
  const [searchSupply, setSearchSupply] = React.useState([]);
  const [showSearch, setShownSearch] = React.useState(false);
  const [deepCategoryIndex, setDeepCategoryIndex] = React.useState(null);
  const searchRef = React.useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const getOut = () => {
    dispatch(logOutAuth());
    localStorage.clear();
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
      if (openSearch && searchRef.current && !searchRef.current.contains(target)) {
        setOpenSearch(false);
        setShownSearch(false);
      }
    };
    document.addEventListener('click', outsideClicker);
    return () => {
      document.removeEventListener('click', outsideClicker);
    }
  }, [searchRef, openSearch]);

  const onClickCategory = (e, title, category, id) => {
    e.stopPropagation();
    router.push({
      pathname: "/category/[id]",
      query: {id, title, category: category},
    });
  };

  const normalizeSearch = word => {
    return word.trim().replaceAll(" ", "+");
  };

  function debounce(func, time = 300) {
    let timer = null;

    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(func.bind(this, ...args), time);
    }
  }

  const handleSearchChange = debounce((e) => {
    setSearchData(e.target.value);
    izzi
      .get("/coupons/search-text", {
        params: {
          name: normalizeSearch(e.target.value),
        },
      })
      .then((response) => {
        setSearchSupply(response.data);
      })
      .catch((err) => {
      });
  });

  const handleSearchSupply = (supply) => {
    setShownSearch(false);
    setOpenSearch(false);
    router.push({
      pathname: `/search-result`,
      query: {search: supply},
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: `/search-result`,
      query: {search: normalizeSearch(searchData)},
    });
    setOpenSearch(false);
  };

  const deepCategoryClick = index => {
    if (deepCategoryIndex !== null) {
      setDeepCategoryIndex(null)
    } else {
      setDeepCategoryIndex(index)
    }
  }

  const SubLinksMenu = () => {
    if (subCategory === "all") {
      return (
        <>
          <li className="link">
            <Link
              href={"/coupons"}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAllCoupons());
                setOpenBurgerMenu(false);
              }}
            >
              Все
            </Link>
          </li>
          {items.map(({subcategories}, index) => {
            return subcategories.map((item, i) => {
              return (
                <li
                  key={item.title + Date.now().toString()}
                  className="link"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchSubCategoryCoupons(item.id));
                    setOpenBurgerMenu(false);
                  }}
                >
                  <a onClick={e => onClickCategory(e, item.title, "subcategory", item.id)}>{item.title}</a>
                </li>
              );
            });
          })}
        </>
      );
    } else if (subCategory !== false && subCategory !== "all") {
      return items[subCategory].subcategories.map((item, index) => {
        return (
          <>
            <div onClick={() => deepCategoryClick(index)} className="link">
              <a
                onClick={e => onClickCategory(e, item.title, "subcategory", item.id)}
                className={"header_mobile_links_dropdown"}>
                {item.icon && <img src={item.icon}/>}
                {item.title}
              </a>
              <span className={"header_mobile_links_icon"}/>
            </div>
            {
              deepCategoryIndex === index ? (
                <li key={item.title + Date.now().toString()}>
                  <div>
                    <div className="accordion-content accordion-con-js">
                      <li
                        key={item.title + Date.now().toString()}
                        className="link"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(fetchSubCategoryCoupons(item.id));
                          setOpenBurgerMenu(false);
                        }}
                      >
                        <a
                          onClick={e => onClickCategory(e, item.title, "subcategory", item.id)}
                          className="subcategory_link_dropdown">
                          Посмотреть все предложения
                        </a>
                      </li>
                      {item.sub_subcategories.map((item) => (
                        <li
                          key={item.title + Date.now().toString()}
                          className="link"
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(fetchSubSubCategoryCoupons(item.id));
                            setOpenBurgerMenu(false);
                          }}
                        >
                          <a
                            onClick={e => onClickCategory(e, item.title, "subsubcategory", item.id)}
                            className="sub_subcategory_link">{item.title}</a>
                        </li>
                      ))}
                    </div>
                  </div>
                </li>
              ) : null
            }
          </>
        );
      });
    } else if (showCategories)
      return (
        <>
          <li className="link">
            <a
              onClick={(e) => {
                e.preventDefault();
                setSubCategoryIndex("all");
              }}
            >
              Все
            </a>
          </li>
          {items.map((item, index) => {
            return (
              <li key={item.title + Date.now().toString()} className="link">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSubCategoryIndex(index);
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </>
      );
  };

  return (
    <div className="header-mobile">
      <div className="container">
        <div className="header-mobile__flex">
          <div className="header-mobile__left">
            <div
              className="menu-hamburger"
              onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
            />
            <div
              className={
                openBurgerMenu ? "header-content show" : "header-content"
              }
            >
              <div className="header-content__inner ">
                <a
                  className={`mobile-menu__heading ${
                    subCategory || subCategory === 0 ? "hide" : ""
                  }`}
                  onClick={() => setShowCategories(false)}
                >
                  Меню
                </a>
                <ul
                  className={`header-mobile-links ${
                    showCategories ? "hide" : ""
                  }`}
                >
                  <li
                    className="link"
                    onClick={() => setShowCategories(!showCategories)}
                  >
                    <a className="arrow open-mobile-nav-js">Категории</a>
                  </li>
                  <li className="link">
                    <Link href="/about-us">
                      <a>О нас</a>
                    </Link>
                  </li>
                  <li className="link">
                    <Link href="/help-page">
                      <a>Помощь</a>
                    </Link>
                  </li>
                  <li className="link">
                    <Link href="/contact-page">
                      <a>Контакты</a>
                    </Link>
                  </li>
                  <li className="link">
                    <Link href="/favorite">
                      <a>Избранное</a>
                    </Link>
                  </li>
                  {tokenPartner ? (
                    <li className="link">
                      <Link href="/my-coupons">
                        <a>Мои купоны</a>
                      </Link>
                    </li>
                  ) : (
                    <li className="link">
                      <Link href="/signin">
                        <a>Мои купоны</a>
                      </Link>
                    </li>
                  )}
                </ul>
                <div
                  className={`link-content ${
                    showCategories ? "show-links" : ""
                  }`}
                >
                  <div className="link-content__wrapper">
                    <a
                      className={`mobile-menu__heading back-to-categories-js ${
                        !subCategory && subCategory !== 0 ? "hide" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSubCategoryIndex(false);
                      }}
                    >
                      Назад к категориям
                    </a>
                    <ul className="header-mobile-links">{SubLinksMenu()}</ul>
                  </div>
                </div>
                <div className="header-mobile__bottom">
                  <div className="top-side-phone">
                    <span>Тел:</span>
                    <a href={`tel:${itemsPhone.phone1}`}>{itemsPhone.phone1}</a>
                  </div>
                  {tokenPartner ? (
                    <Link href={"/partner"}>
                      <a className="top-side-btn">Стать партнером</a>
                    </Link>
                  ) : (
                    <Link href={"/signin"}>
                      <a className="top-side-btn">Стать партнером</a>
                    </Link>
                  )}
                </div>
              </div>
              <div
                className="close-mobile-menu"
                onClick={() => setOpenBurgerMenu(!openBurgerMenu)}
              />
            </div>
            <Link href={"/"}>
              <a className="header-logo">
                <img src="/svg/logo.svg"/>
              </a>
            </Link>
          </div>

          <div className="header-mobile__right">
            <div
              className=" header-flex"
              style={{display: openSearch ? "block" : "none"}}
            >
              <div className="header-search" ref={searchRef}>
                <form
                  className="header-form"
                  action=""
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    className="header-input"
                    type="text"
                    placeholder="Поиск"
                    onChange={handleSearchChange}
                    onFocus={() => setShownSearch(true)}
                  />
                  {showSearch && searchSupply.length ? (
                    <div className={searchModule.header_search_supply}>
                      {searchSupply.map((item, index) => {
                        return (
                          <div
                            onClick={() => handleSearchSupply(item.title)}
                            className={searchModule.search_supply}
                            key={index}
                          >
                            {item.title}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                  <button
                    className="header-button"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenSearch(false);
                      router.push({
                        pathname: `/search-result`,
                        query: {search: searchData},
                      });
                    }}
                  />
                </form>
              </div>
            </div>
            <div className="search-icon" onClick={() => setOpenSearch(!openSearch)}>
              <img src="/svg/search-mobile-but.svg" alt="search"/>
            </div>
            <div className="header-profile">
              {!tokenPartner ? (
                <Link href={"/signin"}>
                  <a className="header-link sign-in">
                    <img style={{marginRight: "5px"}} src="/svg/header-sign-in.svg" alt=""/>
                    Войти
                  </a>
                </Link>
              ) : (
                <div>
                  <a onClick={() => setLoginUser(!loginUser)}>
                    <img style={{marginRight: "5px"}} src="/svg/user.svg" alt=""/>
                    {name.length > 5 ? name.slice(0, 5) + '...' : name}
                  </a>
                  <div
                    className="profile-dropdown"
                    style={{display: loginUser ? "block" : "none"}}
                  >
                    <div className="profile-dropdown__inner">
                      <ul className="about-us__links wrapper-for-main-icon">
                        <li>
                          <Link href={"/profile"}>
                            <a className="personal-area">Профиль</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/partner"}>
                            <a className="partner">Страница партнера</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/shares"}>
                            <a className="promotions">Мои акции</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/my-coupons"}>
                            <a className="coupon">Мои купоны</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/change-number"}>
                            <a className="phone">Сменить номер</a>
                          </Link>
                        </li>
                        <li>
                          <Link href={"/change-password"}>
                            <a className="password">Сменить пароль</a>
                          </Link>
                        </li>
                        <li>
                          <a className="exit" onClick={() => getOut()}>
                            Выйти из аккаунта
                          </a>
                        </li>
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

export default HeaderMobile;
