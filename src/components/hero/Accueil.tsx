import { COLORS } from "../../variables/couleur";
import HoraireOuvertureCard from "../card/HoraireOuvertureCard";

export default function Accueil() {
    return (
        <section className="max-w-4xl mx-auto py-20 px-6 text-center">
            <h2
                className="text-xl sm:text-4xl font-bold mb-6"
                style={{ color: COLORS.primary }}
            >
                Bienvenue chez <span className="whitespace-nowrap">Les Petits Géants</span>
            </h2>
            <div className="text-xs sm:text-xl leading-relaxed opacity-90">
                <p>Nous sommes Les Petits Géants d'Arras, votre magasin de jeux et jouets pour enfants.</p>
                <p className="text-center">Vous pouvez nous trouver au  <span className="whitespace-nowrap font-bold">10 Place du Théâtre, 62000 Arras.</span></p>
            </div>
            <div className="pt-8">
                <HoraireOuvertureCard />
            </div>
        </section>
    )
}