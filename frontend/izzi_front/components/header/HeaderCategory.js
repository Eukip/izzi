import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {getCategories} from "../../store/actions/categories";
import styles from './styles.module.scss'
import classNames from "classnames";
import {useRouter} from "next/router";
import {getTags} from "../../store/actions/tags";

const HeaderCategory = () => {
    const [activeLink] = React.useState(null)
    const categories = useSelector(({categories: {data}}) => data)
    // TODO теги оказались ненужными, так как рендер иконок берется от услуг
    const tags = useSelector(({tags: {data}}) => data ?? [])
    const router = useRouter()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getTags())
    }, [])

    const onClickCategory = (e, title, category, id) => {

        e.stopPropagation()

        router.push({
            pathname: "/category/[id]",
            query: {id, title, category: category}
        })
    }

    return (
        <nav className="nav">
            <div className="nav-inner">
                <a className="mobile-menu__heading close-mobile-nav-js">Меню</a>
                <div className="container">
                    <div className="category-heading">Категории</div>
                    <div className="nav-links">
                        <div className="link">
                            <Link href={"/coupons"}>
                                <a className={activeLink === null ? 'active' : ''}
                                >Все</a>
                            </Link>
                            {categories && categories.map(({title, subcategories, id}, index) => {
                                return <div
                                    onClick={(e) => onClickCategory(e, title, "subcategory", id)}
                                    className={classNames("link", styles.dropdown)}>
                                    <a
                                        className={styles.categories}
                                        key={index}>
                                        {title}
                                        <ul className={styles.dropdownContent}>
                                            {subcategories.map(({title, icon, sub_subcategories, id}, index) => {
                                                return <li key={index + 1}
                                                           onClick={(e) => onClickCategory(e, title, "subcategory", id)}>
                                                    <div className={styles.categoriesElement}>
                                                        <div className={styles.categoriesHead}>
                                                            <img src={icon} alt=""/>
                                                            <p>{title}</p>
                                                        </div>
                                                        <ul>
                                                            {sub_subcategories.map(({title, id}, index) => {
                                                                return <div
                                                                    onClick={(e) => onClickCategory(e, title, "sub-subcategory", id)}
                                                                    className={styles.categoriesBody}
                                                                    key={index + 2}>
                                                                    <p>{title}</p>
                                                                </div>
                                                            })}
                                                        </ul>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </a>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderCategory;
