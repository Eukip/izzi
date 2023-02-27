import Head from "next/head";
import CouponsItem from "../components/coupons/couponsItem/CouponsItem";
import { MainLayout } from "../components/MainLayout";
import FavoriteCoupons from "../components/favoriteCoupons/FavoriteCoupons";

export default function favorite() {
    return (
        <MainLayout title={"Избранное"}>
            <FavoriteCoupons />
        </MainLayout>
    );
}
