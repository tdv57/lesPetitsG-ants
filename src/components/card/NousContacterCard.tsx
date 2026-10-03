import { FaEnvelope, FaPhone } from "react-icons/fa";
import { COLORS } from "../../variables/couleur";

export function NousContacterCard() {
    const CONTACT = {
        telAffiche: "06 02 11 71 47",
        telLien: "+33602117147",
        mail: "lespetitsgeantsarras@gmail.com",
    };
    return (
        <>
            <section className="flex flex-col items-center gap-2 py-8 md:py-8 lg:py-12 px-4">
                <h2
                    className="text-sm whitespace-nowrap sm:text-3xl lg:text-4xl font-bold "
                    style={{ color: COLORS.primary, fontFamily: "Fredoka" }}
                >
                    Nous contacter
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 font-bold">
                    <a
                        href={`tel:${CONTACT.telLien}`}
                        className="flex items-center gap-2  text-sm md:text-lg lg:text-2xl"
                        style={{ color: COLORS.primary, fontFamily: "Fredoka" }}
                    >
                        <FaPhone /> {CONTACT.telAffiche}
                    </a>
                    <a
                        href={`mailto:${CONTACT.mail}`}
                        className="flex items-center gap-2  text-sm md:text-lg lg:text-2xl"
                        style={{ color: COLORS.primary, fontFamily: "Fredoka" }}
                    >
                        <FaEnvelope /> {CONTACT.mail}
                    </a>
                </div>
            </section>
        </>
    );
}