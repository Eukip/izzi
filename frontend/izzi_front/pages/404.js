import Link from "next/link";
import { MainLayout } from "../components/MainLayout";

export default function ErrorPage() {
    return (
        <MainLayout>
            <main class="error__page background-grey">
                <div class="error-content">
                    <h3>Ошибка</h3>
                    <div class="img">
                        <img src="img/svg/404.svg" alt="" />
                    </div>
                    <p>Страница не найдена</p>
                    <Link href={'/'}>
                        <a >На главную</a>
                    </Link>
                </div>
            </main>
        </MainLayout>
    );
}
