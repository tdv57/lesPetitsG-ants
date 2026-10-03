import { useRef } from "react";
import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { useArticleDeLaSaison } from "../../hook/useArticleDeLaSaison";

export default function ArticleDeLaSaison() {

    const {videoData} = useArticleDeLaSaison();
    const videoRef = useRef<HTMLDivElement>(null);

    return (<>
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--nav-h,0px))] px-4">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl  pt-4 mb-4"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            >
                L'ARTICLE DE LA SAISON
            </h2>
            <div className="w-full flex justify-center">
                {videoData && (
                    <VideoCard
                        src={videoData.src}
                        titre={videoData.titre}
                        age={videoData.age}
                        ref={videoRef}
                        sizeClassName="w-[85vw] max-w-[1100px] h-[48vh] sm:h-[52vh] lg:h-[58vh]"
                    />
                )}
            </div>
        </section>
    </>);
}