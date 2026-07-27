import { COLORS } from "../../variables/couleur";
import { MENU_NOM } from "../../variables/menu";
import { Link } from "react-router";

export default function FooterApp() {
    return (
        <>
            <footer
                className="w-full text-xs sm:text-lg flex flex-col items-center justify-center py-10 "
                style={{ backgroundColor: COLORS.textDark, color: COLORS.textLight }}
            >

                <div className=" grid grid-cols-2 md:flex gap-4 sm:gap-8">
                    {MENU_NOM.map((menuNom) => <Link to={menuNom.url} className="whitespace-nowrap hover:opacity-80 transition-opacity sm:text-sm md:text-md lg:text-lg font-semibold tracking-wide font-nav md:gap-4">{menuNom.nom}</Link>)}
                </div>

                

            </footer>
        </>
    )
}