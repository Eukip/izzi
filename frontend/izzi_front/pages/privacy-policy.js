import { MainLayout } from "../components/MainLayout";
import PrivacyPolicy from "../components/privacyPolicy/privacyPolicy";

export default function PrivacyPolicyMain() {
    return (
        <MainLayout title={"Политика конфиденциальности"}>
            <PrivacyPolicy/>
        </MainLayout>
    );
}
