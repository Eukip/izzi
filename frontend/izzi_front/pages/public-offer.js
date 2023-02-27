import { MainLayout } from "../components/MainLayout";
import PublicOffer from "../components/publicOffer/publicOffer";

export default function PublicOfferMain() {
    return (
        <MainLayout title={"Публичная оферта"}>
            <PublicOffer/>
        </MainLayout>
    );
}
