
import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import CouponsItem from "../coupons/couponsItem/CouponsItem";
import {GetFavoriteCoupons, GetFavoriteCouponsFromLocalStorage} from "../../store/actions/favorite";
import CouponsLoading from "../coupons/couponsItem/CouponsLoading";

const FavoriteCoupons = () => {
    const dispatch = useDispatch();
    const items  = useSelector(({ favorite }) => favorite.items);
    const isLoaded = useSelector(({ favorite }) => favorite.isLoaded);
    React.useEffect(() => {
        if(localStorage.getItem("access_token")){
            dispatch(GetFavoriteCoupons())
        }else{
            dispatch(GetFavoriteCouponsFromLocalStorage())
        }

    },[])

    return (
        <div className="coupons">
            <div className="container">
                <h3 className="title-box">Избранное</h3>
                <div className="coupons-list">
                    {isLoaded ? items?.map((item) => (
                        <CouponsItem
                            data={item}
                            key={item.id}
                            {...item}
                        />
                    ) ) : Array(8)
                        .fill(0)
                        .map((_, index) => <CouponsLoading key={index} />)}
                </div>
            </div>
        </div>
    );
};

export default FavoriteCoupons;

