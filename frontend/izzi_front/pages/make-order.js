import { MainLayout } from "../components/MainLayout";
import MakeOrder from "../components/makeOrder/makeOrder";

export default function MakeOrderMain() {
    return (
        <MainLayout title={"Как сделать заказ"}>
           <MakeOrder/>
        </MainLayout>
    );
}
