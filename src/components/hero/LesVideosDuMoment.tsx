import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { useVideoDuMoment } from "../../hook/useVideosDuMoment";

export default function LesVideosDuMoment() {

    const {videosDuMoment} = useVideoDuMoment();

    return (<>
        <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
                LES VIDEOS DU MOMENT
            </h2>   
            {
                videosDuMoment.map((video, index) =>
                {
                    const isLast = index === videosDuMoment.length - 1;
                    return (
                        <>
                        <a
                            href={`#video-${index}`}
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