import HeaderCategory from "./HeaderCategory";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export function Header() {
    return (
        <header className="header">
            <HeaderDesktop/>
            <HeaderCategory/>
            <HeaderMobile/>
        </header>
    );
}
