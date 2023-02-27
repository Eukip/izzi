import { MainLayout } from "../components/MainLayout";
import PaymentWays from "../components/paymentWays/paymentWays";

export default function PaymentWaysMain() {
    return (
        <MainLayout title={"Способы оплаты"}>
           <PaymentWays />
        </MainLayout>
    );
}
