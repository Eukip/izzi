import { MainLayout } from "../components/MainLayout";
import FavoriteCoupons from "../components/favoriteCoupons/FavoriteCoupons";
import PartnerComponent from "../components/profile/partner/PartnerComponent";

export default function partner() {
    return (
        <MainLayout title={"Стать партнером"}>
            <PartnerComponent />
        </MainLayout>
    );
}
