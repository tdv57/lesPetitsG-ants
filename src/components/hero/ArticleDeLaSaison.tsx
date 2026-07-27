import { useEffect, useRef } from "react";
import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { useArticleDeLaSaison } from "../../hook/useArticleDeLaSaison";

export default function ArticleDeLaSaison() {

    const {videoData} = useArticleDeLaSaison();
    const videoRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        videoRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []);

    return (<>
        <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl font-bold pt-12 mb-10"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Arial Rounded MT Bold" }}
            > 
                L'ARTICLE DE LA SAISON
            </h2>   
            <div className="w-80 sm:w-120 md:w-140">
                {videoData && <VideoCard src={videoData.src} titre={videoData.titre} age={videoData.age} ref={videoRef} />}
            </div>
        </section>
    </>);
}