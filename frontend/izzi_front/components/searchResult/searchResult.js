import React, {useEffect, useState} from 'react';
import {fetchSearchBar} from "../../store/actions/searchBar";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import CouponsItem from "../coupons/couponsItem/CouponsItem";
import Link from "next/link";

const SearchResult = () => {
    const dispatch = useDispatch();
    const items = useSelector(({ searchBar }) => searchBar.items);
    const router = useRouter()
    const search = router.query.search

    useEffect(() => {
        dispatch(fetchSearchBar(search));
    }, [router, search]);

    const handleAddCouponToFavorite = (item) => {
        dispatch({
            type: "ADD_COUPON_TO_FAVORITE",
            payload: item,
        });
    };


    return (
        <>
            <div className="coupons">
                <div className="container">
                    <div className="crumb">
                            <div className="crumb-list">
                                <Link href="/">
                                    <a className="crumb-item">Главная</a>
                                </Link>
                                <span className="crumb-item">Результаты поиска</span>
                        </div>
                    </div>
                    <h3 className="title-box">Результаты поиска</h3>
                    <div className="coupons-list">
                        {
                            items.results ?
                                items.results.map((item) =>
                                    <CouponsItem
                                        onCLickAddCoupon={handleAddCouponToFavorite}
                                        key={item.id}
                                        {...item}
                                    />
                            )
                            : <h3 className="search_error">По вашему запросу ничего не найдено.</h3>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResult;
