import { FaFacebook, FaInstagram } from "react-icons/fa";
import { COLORS } from "../../variables/couleur";

type NosReseauxCardPropsType = {
    id?: string;
}
export function NosReseauxCard({ id }: NosReseauxCardPropsType) {
    const RESEAUX = {
        facebook: "https://www.facebook.com/lespetitsgeantsarras/",
        instagram: "https://www.instagram.com/les_petits_geants/",
    };
    return (
        <>
        <div id={id}  className={`${id ? "scroll-mt-10" : ""} flex flex-col items-center md:pt-8 lg:pt-12 px-4`}>
            <h2
                className="text-sm whitespace-nowrap sm:text-3xl lg:text-4xl font-bold mb-6"
                style={{ color: COLORS.primary, fontFamily: "Fredoka" }}
            >
                Nos réseaux sociaux
            </h2>

            {/* 1. Réseaux sociaux : juste les logos */}
            <div className="flex justify-center gap-6">
                <a
                    href={RESEAUX.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Notre page Facebook"
                    className="transition-opacity hover:opacity-80"
                    style={{ color: COLORS.primary }}
                >
                    <FaFacebook size={40} />
                </a>
                <a
                    href={RESEAUX.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Notre compte Instagram"
                    className="transition-opacity hover:opacity-80"
                    style={{ color: COLORS.primary }}
                >
                    <FaInstagram size={40} />
                </a>
            </div>
            </div>
        </>
    )
}
