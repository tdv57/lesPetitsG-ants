import { useState, useEffect, useRef } from "react";
import { COLORS } from "../../variables/couleur";
import { MENU_NOM } from "../../variables/menu";
import { Link, useLocation } from "react-router";
type NavAppProps = {
    setNavHeight : (i:number) => void
};
export default function NavApp({setNavHeight} : NavAppProps) {
    const [menuButton, setMenuButton] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const navBarRef =  useRef<HTMLElement | null>(null);
    const { pathname } = useLocation();

    const handleShowNav = (navBarHeight: number, currentScrollY: number, lastScrollY: number) => {
        if (currentScrollY < navBarHeight - 70) {
            setShowNav(true);
            lastScrollY = currentScrollY;
            return;
        }

        if (currentScrollY > lastScrollY) {
        // Scroll vers le bas
        setShowNav(false);
        } else {
        // Scroll vers le haut
        setShowNav(true);
        }
    }

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {

            const navBarHeight =  navBarRef.current?.offsetHeight || 0;
            console.log("navBarHeight = " + navBarHeight);
            const currentScrollY = window.scrollY;

            handleShowNav(navBarHeight, currentScrollY, lastScrollY);

            lastScrollY = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    // La hauteur de la nav dépend de la fenêtre en lg (15vh) : on la suit au redimensionnement
    useEffect (() => {
        const nav = navBarRef.current;
        if (!nav) return;
        setNavHeight(nav.offsetHeight);
        const observer = new ResizeObserver(() => setNavHeight(nav.offsetHeight));
        observer.observe(nav);
        return () => observer.disconnect();
    }, [])

    const handleLinkClick = (url: string) => {
        if (url === pathname) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            <nav
                ref={navBarRef}
                className=
                    {`fixed top-0 left-0 z-50 
                        w-full max-w-full box-border overflow-x-hidden
                        flex flex-col md:flex-row md:justify-between items-center lg:h-[15vh] lg:min-h-30
                        transition-transform duration-300 ease-in-out
                        ${showNav ? "translate-y-0" : "-translate-y-full"}
                    `}

                style={{ backgroundColor: COLORS.textDark, color: COLORS.textLight }}
            >
                {/* Conteneur Gauche : Logo (Desktop uniquement) */}
                <div className="flex shrink-0 min-w-0 justify-start lg:h-full lg:ml-8 md:mr-20 lg:mr-20 cursor-pointer">
                    <Link to="/" className="lg:h-full">
                    <img
                        src="/assets/logo2.png"
                        alt="Logo du magasin Les Petits Géants d'Arras"
                        className=" h-30 w-30 sm:h-40 sm:w-40 md:h-35 md:w-35 lg:w-auto lg:h-full md:ml-5 object-contain"
                    /></Link>
                </div>


                {/* Conteneur Droite : Liens (Desktop uniquement) */}
                <div style={{ color: COLORS.test }} className="flex-1 min-w-0 hidden sm:text-shadow-md md:text-md lg:text-[clamp(0.875rem,2.3vh,1.5rem)] md:flex justify-end md:mr-4 gap-4 md:gap-4 lg:gap-6">
                    {MENU_NOM.map((menuNom) => <Link to={menuNom.url} className="text-center hover:opacity-80 transition-opacity font-semibold tracking-wide font-nav" onClick={() => handleLinkClick(menuNom.url)}>{menuNom.nom}</Link>)}
                </div>

                <button className={`md:hidden  px-4 mb-4 -mt-6 sm:-mt-8  cursor-pointer`} onClick={() => setMenuButton(!menuButton)}>
                    {menuButton ? "✕" : "☰"}
                </button>
                {/* Liens Mobile (S'affichent en dessous sur petit écran grâce au flex-col) */}
                <div className="overflow-hidden mb-4">
                    <div className={`
                        flex flex-col md:hidden items-center justify-center gap-2
                        transition-all duration-400 ease-in-out
                        text-xs
                        ${menuButton ? 
                            "opacity-100 translate-y-0 max-h-96" 
                            : 
                            "opacity-0 -translate-y-2 max-h-0 overflow-hidden pointer-events-none"
                        }
                    `}>
                        {MENU_NOM.map((menuNom) => <Link to={menuNom.url} className="text-center hover:opacity-80 transition-opacity font-semibold tracking-wide font-nav" onClick={() => {setMenuButton(false); handleLinkClick(menuNom.url);}}></Link>)}

                    </div>
                </div>
                    
                

            </nav>
        </>
    )
}