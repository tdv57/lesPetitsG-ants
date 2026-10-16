import { forwardRef, useEffect, useRef, useState } from "react";
import { COLORS } from "../../variables/couleur";

type VideoCardProp = {
    src: string;
    titre: string;
    age: string;
    sizeClassName?: string;
};

export const VideoCard = forwardRef<HTMLDivElement, VideoCardProp>(({src, titre, age, sizeClassName = "w-80 sm:w-100 md:w-100 h-60 sm:h-72 md:h-80"}, ref) => {

  const [_size, setSize] = useState({width: 0, height: 0});

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoRefCurrent = videoRef.current;
    if(!videoRefCurrent) return;


      const observer = new ResizeObserver(() => {
      const rect = videoRefCurrent.getBoundingClientRect();

      setSize({
        width: rect.width,
        height: rect.height,
      });
    });



  observer.observe(videoRefCurrent);

  return () => observer.disconnect();


  }, [videoRef])

  return (
  <>
    <div className="p-4  w-full h-full flex justify-center">
      <div data-video-card className="  flex flex-col items-center justify-between h-full md:w-full rounded-lg" style={{background: COLORS.backgroundCard}} >
         <h2 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="py-4 px-4 md:py-8 md:px-8 lg:px-12 lg:py-12 text-center md:h-[11rem] lg:h-[13rem] md:flex md:flex-col md:justify-center md:overflow-hidden">
          {titre && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl ">{titre}</h3>}
          {age && <h3 className="text-lg sm:text-lg md:text-xl lg:text-2xl ">{age}</h3>}
          </h2>         
          <div ref={ref} className="p-4 sm:px-8 md:px-4 sm:py-0 sm:pb-8 lg:px-4 w-full flex justify-center">
              <div className={`relative flex flex-col items-center justify-center overflow-hidden ${sizeClassName}`}>
                  <video
                      controls 
                      muted 
                      loop 
                      disablePictureInPicture 
                      disableRemotePlayback 
                      ref={videoRef} 
                      className="rounded-lg max-w-full max-h-full w-auto h-auto object-contain"
                      autoPlay
                  >
                      <source src={src} />
                      Votre navigateur ne supporte pas la vidéo.
                  </video>
              </div>
          </div>
      </div>
  </div>

  </>
  );
});