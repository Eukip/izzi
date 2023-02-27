import { MainLayout } from "../components/MainLayout";
import MySharesComponent from "../components/profile/myShares/MySharesComponent";

export default function favorite() {
    return (
        <MainLayout title={"Мои акции"}>
            <MySharesComponent />
        </MainLayout>
    );
}
