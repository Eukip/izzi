import React from "react";
import {fetchCoupons, fetchSubCategoryCoupons, fetchSubSubCategoryCoupons} from "../../../store/actions/coupons";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {fetchCategoryTags} from "../../../store/actions/tags";

const HeaderCategoryItem = ({id,handleClick,title,activeLink,subcategories}) => {
    const dispatch = useDispatch();
    const router = useRouter()

    const linksSubCat = (id) => {
        router.push({
            pathname: `/coupons/subcategory/${id}`,
        }, undefined, {shallow: false})
        dispatch(fetchSubCategoryCoupons(id))
    }

    const linksCat = (id, title) => {
        router.push({
            pathname: `/coupons/category/${id}`,
        }, undefined, {shallow: false})
        handleClick(id, title)
        dispatch(fetchCoupons(id))
        dispatch(fetchCategoryTags(id))
    }
    const linksSubSubCategory = (id, title) => {
        router.push({
            pathname: `/coupons/subsubcategory/${id}`,
        }, undefined, {shallow: false})
        handleClick(id, title)
        dispatch(fetchSubSubCategoryCoupons(id))
    }
    return (
        <div className="link">
            <a onClick={() => linksCat(id, title)} className={activeLink === id ?  'active' : ''}>{title}</a>
            <div className="link-content">
                <div className="link-content__wrapper">
                    <a className="mobile-menu__heading back-to-categories-js">
                        Назад к категориям
                    </a>
                    <div className="category-heading"/>
                    <div className="subcat">
                        {!!subcategories ? subcategories.map((item, index) => (
                                <div key={index} className="link-inner active">
                                    <a onClick={() => linksSubCat(item.id, item.title)}>
                                        {item.icon && <img src={item.icon}/>}
                                        {item.title}
                                    </a>
                                    {item.sub_subcategories.map(item => (
                                        <div key={item.id} className="link-inner_wrapper">
                                            <a onClick={() => linksSubSubCategory(item.id, item.title)}>{item.title}</a>
                                        </div>
                                    ))}
                                </div>
                            ))
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderCategoryItem;
