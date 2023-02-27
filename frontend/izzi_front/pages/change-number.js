import { MainLayout } from "../components/MainLayout";
import ChangeNumberWrapper from "../components/profile/changeNumber";
export default function favorite() {
    return (
        <MainLayout title={"Смена номера"}>
            <ChangeNumberWrapper />
        </MainLayout>
    );
}
