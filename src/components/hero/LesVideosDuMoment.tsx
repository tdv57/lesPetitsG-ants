import { Fragment } from "react";
import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { LoadingCard } from "../card/LoadingCard";
import { useVideosDuMoment } from "../../hook/useVideosDuMoment";

export default function LesVideosDuMoment() {

    const {data : videosDuMoment,  isPending, isError} = useVideosDuMoment();


    const scrollToVideo = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        const card = document.getElementById(`video-${index}`)?.querySelector<HTMLElement>("[data-video-card]");
        if (!card) return;
        e.preventDefault();
        const rect = card.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        window.scrollTo({ top: Math.min(bottom - window.innerHeight, top), behavior: "smooth" });
    };

    return (<>
        <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)] mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
                LES VIDEOS DU MOMENT
            </h2>   
            <div className="contents md:grid md:grid-cols-2 md:gap-4 md:w-full md:max-w-[1400px] md:px-4">
            {
                isPending || isError ?  (
                <> 
                    <div
                    className="flex flex-col items-center scroll-mt-[var(--nav-h)] md:min-w-0 md:h-full"
                    >
                        <LoadingCard/> 
                    </div>
                    <div
                    className="flex flex-col items-center scroll-mt-[var(--nav-h)] md:min-w-0 md:h-full"
                    >
                        <LoadingCard/> 
                    </div>
                </>) : 
                videosDuMoment.map((video, index) =>
                {
                    return (
                        <Fragment key={index}>
                        <a
                            href={`#video-${index}`}
                            onClick={(e) => scrollToVideo(e, index)}
                            aria-label="Aller à la vidéo suivante"
                            className="my-4 px-4 py-2 rounded-full font-bold md:hidden"
                            style={{ background: COLORS.primary, color: COLORS.background }}
                        >
                            ↓ Vidéo suivante
                        </a>
                        <div
                            id={`video-${index}`}
                            className="flex flex-col items-center scroll-mt-[var(--nav-h)] md:min-w-0 md:h-full"
                        >

                        <VideoCard
                            src={video.src}
                            titre={video.titre}
                            age={video.age}
                            sizeClassName="w-[85vw] max-w-[1100px] h-[48vh] sm:h-[52vh] md:w-full md:max-w-none md:h-[40vh] lg:h-[48vh]"
                        />
                        </div>
                        </Fragment>
                    );
                })
            }
            </div>

        </section>
    </>);
}