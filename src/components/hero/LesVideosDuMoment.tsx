import { COLORS } from "../../variables/couleur";
import { VideoCard } from "../card/VideoCard";
import { useVideoDuMoment } from "../../hook/useVideosDuMoment";

export default function LesVideosDuMoment() {

    const {videosDuMoment} = useVideoDuMoment();

    return (<>
        <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl font-bold pt-12 mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Arial Rounded MT Bold" }}
            > 
                LES VIDEOS DU MOMENT
            </h2>   
            {
                videosDuMoment.map((video, index) => 
                {
                    return (
                        <div className="w-80 sm:w-120 md:w-140">
                            <VideoCard key={index} src={video.src} titre={video.titre} age={video.age} />
                        </div>
                    );
                }
                    
                )
            }
            
        </section>
    </>);
}