import { MainLayout } from "../components/MainLayout";
import MyCouponsComponent from "../components/profile/myCoupons/MyCouponsComponent";
export default function myCoupons() {
    return (
        <MainLayout title={"Мои купоны"}>
            <MyCouponsComponent />
        </MainLayout>
    );
}
