import React from "react";
import { MainLayout } from "../../components/MainLayout";
import { useRouter } from "next/router";
import CouponsDetail from "../../components/coupons/couponsDetail/CouponsDetail";
import { useSelector, useDispatch } from "react-redux";
import {fetchDetailCoupons} from "../../store/actions/couponsDetail";
import CircularProgress from "../../components/circularProgress/circularProgress";

export default function coupons() {
     const router = useRouter();
    const dispatch = useDispatch();
    const items = useSelector(({ couponDetails }) => couponDetails.items);
    const isLoaded = useSelector(({couponDetails}) => couponDetails.isLoaded)
    const id = router.query.id

    React.useEffect(() => {
        dispatch(fetchDetailCoupons(id || window.location.pathname.split("/").pop()))
    }, []);

    return (
        <MainLayout title={"Детальная страница"}>
            {isLoaded ?  <CouponsDetail {...items} /> : <CircularProgress/>}
        </MainLayout>
    );
}

