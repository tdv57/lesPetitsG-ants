import { COLORS } from "../../variables/couleur";

export function CatalogueCard() {
    return (
        <>
            <section className="flex flex-col items-center gap-2 py-8 md:py-8 lg:py-12 px-4">
                <h2
                    className="text-sm whitespace-nowrap sm:text-3xl lg:text-4xl font-bold "
                    style={{ color: COLORS.primary, fontFamily: "Fredoka" }}
                >
                    Notre catalogue
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8 font-bold">
                    <div className="text-xs sm:text-xl lg:text-3xl leading-relaxed opacity-90" style={{ fontFamily: "Fredoka" }}>
                        <p>Vous pouvez accéder à tous nos articles en cliquant sur le catalogue</p>
                        <a href="https://www.calameo.com/read/0057501980d61bdd316e2" className="inline-block mt-4">
                            <img
                            src="https://pub-9b12e0dc1c364dcb9166888391912649.r2.dev/catalogue_petits_geants.png"
                            alt="Catalogue des petits géants"
                            className="w-full max-w-[500px] h-auto"
                            />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}