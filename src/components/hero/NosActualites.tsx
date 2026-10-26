import { useQuery } from "@tanstack/react-query";
import { findAllAnnonce } from "../../service/AnnonceService";
import { COLORS } from "../../variables/couleur";
import { Fragment } from "react/jsx-runtime";
import { AnnonceCard } from "../card/AnnonceCard";
import { QueryKeys } from "../../queries/QueryKeys";

export function NosActualites() {
    const { data: annonces = []} = useQuery({
        queryKey: QueryKeys.annonces.findAll(),
        queryFn: () => findAllAnnonce()
    });

    return (
<section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)] mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
                NOS ACTUALITÉS
            </h2>   
            <div className="flex flex-col items-center gap-6 md:w-full md:max-w-[1400px] md:px-4">
            {
                annonces.map((annonce, index) =>
                {
                    return (
                        <Fragment key={index}>
                        <div
                            id={`video-${index}`}
                            className="flex flex-col items-center scroll-mt-[var(--nav-h)] w-[85vw] max-w-[1100px] mx-auto md:w-1/2 md:max-w-none md:min-w-0"
                        >
                        <AnnonceCard
                            annonce={annonce}
                            sizeClassName="w-full max-w-none h-[max(40vh,20rem)] lg:h-[max(48vh,24rem)]"
                        />
                        </div>
                        </Fragment>
                    );
                }

                )
            }
            </div>

        </section>
    )
}