import { MainLayout } from "../components/MainLayout";
import Requisites from "../components/requisites/requisites";

export default function RequisitesMain(){
    return (
        <MainLayout title={"Реквизиты"}>
            <Requisites/>
        </MainLayout>
    );
}
