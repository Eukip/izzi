import { MainLayout } from "../components/MainLayout";
import ChangePassword from "../components/profile/changePassword/ChangePassword";
export default function favorite() {
    return (
        <MainLayout title={"Смена пароля"}>
           <ChangePassword/>
        </MainLayout>
    );
}
