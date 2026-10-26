import { useRef } from "react";
import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { useArticleDeLaSaison } from "../../hook/useArticleDeLaSaison";
import { LoadingCard } from "../card/LoadingCard";

export default function ArticleDeLaSaison() {

    const {data: videoData, isPending, isError} = useArticleDeLaSaison();
    const videoRef = useRef<HTMLDivElement>(null);

    return (<>
       <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)] mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            >
                L'ARTICLE DE LA SAISON
            </h2>
            <div className="w-full flex justify-center">
                {
                    (isPending || isError) &&  (
                    <> 
                        <div
                        className="flex flex-col items-center scroll-mt-[var(--nav-h)] md:min-w-0 md:h-full"
                        >
                            <LoadingCard/> 
                        </div>
                    </>)
                }
                {videoData && (
                    <div className="flex flex-col items-center md:min-w-0 md:w-[calc(50%-0.5rem)] md:max-w-[676px]">
                        <VideoCard
                            src={videoData.src}
                            titre={videoData.titre}
                            age={videoData.age}
                            ref={videoRef}
                            sizeClassName="w-[85vw] max-w-[1100px] h-[48vh] sm:h-[52vh] md:w-full md:max-w-none md:h-[40vh] lg:h-[48vh]"
                        />
                    </div>
                )}
            </div>
        </section>
    </>);
}