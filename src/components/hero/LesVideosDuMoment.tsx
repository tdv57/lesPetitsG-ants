import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { useVideoDuMoment } from "../../hook/useVideosDuMoment";

export default function LesVideosDuMoment() {

    const {videosDuMoment} = useVideoDuMoment();

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
            {
                videosDuMoment.map((video, index) =>
                {
                    return (
                        <>
                        <a
                            href={`#video-${index}`}
                            onClick={(e) => scrollToVideo(e, index)}
                            aria-label="Aller à la vidéo suivante"
                            className="my-4 px-4 py-2 rounded-full font-bold"
                            style={{ background: COLORS.primary, color: COLORS.background }}
                        >
                            ↓ Vidéo suivante
                        </a>
                        <div
                            key={index}
                            id={`video-${index}`}
                            className="flex flex-col items-center scroll-mt-[var(--nav-h)]"
                        >



                        <VideoCard
                            key={index}
                            src={video.src}
                            titre={video.titre}
                            age={video.age}
                            sizeClassName="w-[85vw] max-w-[1100px] h-[48vh] sm:h-[52vh] lg:h-[58vh]"
                        />
                        </div>
                        </>
                    );
                }

                )
            }

        </section>
    </>);
}