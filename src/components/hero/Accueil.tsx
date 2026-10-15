import { COLORS } from "../../variables/couleur";
import HoraireOuvertureCard from "../card/HoraireOuvertureCard";
import { NousContacterCard } from "../card/NousContacterCard";
import { NosReseauxCard } from "../card/NosReseauxCard";
import { CatalogueCard } from "../card/CatalogueCard";

export default function Accueil() {
    return (
        <section className="max-w-4xl mx-auto py-20 lg:pt-[clamp(2rem,8vh,5rem)] px-6 text-center">
            <h2
                className="text-xl sm:text-4xl md:text-5xl  mb-6"
                style={{ color: COLORS.primary, fontFamily: "Fredoka" }}
            >
                Bienvenue chez <span className="whitespace-nowrap">Les Petits Géants</span>
            </h2>
            <div className="text-xs sm:text-xl lg:text-3xl leading-relaxed opacity-90" style={{ fontFamily: "Fredoka" }}>
                <p>Nous sommes Les Petits Géants d'Arras, votre magasin de jeux et jouets pour enfants.</p>
                <p className="text-center">Vous pouvez nous trouver au  <span className="whitespace-nowrap font-bold">10 Place du Théâtre, 62000 Arras.</span></p>
            </div>

            <div className="pt-8">
                <CatalogueCard/>
                <NosReseauxCard/>
                <NousContacterCard/>
                <HoraireOuvertureCard />
            </div>
        </section>
    )
}