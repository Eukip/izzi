import { MainLayout } from "../components/MainLayout";
import ProfileComponent from "../components/profile/profileComponent/ProfileComponent";
export default function favorite() {
    return (
        <MainLayout title={"Профиль"}>
            <ProfileComponent />
        </MainLayout>
    );
}
