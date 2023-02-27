import { MainLayout } from "../components/MainLayout";
import AnswerQuestion from "../components/answerQuestion/answerQuestion";

export default function MakeOrderMain() {
    return (
        <MainLayout title={"Вопросы и ответы"}>
           <AnswerQuestion/>
        </MainLayout>
    );
}
