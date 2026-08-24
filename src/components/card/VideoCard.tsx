import { forwardRef, useEffect, useRef, useState } from "react";
import {VideoPlayerCard} from "./VideoPlayerCard";
import { COLORS } from "../../variables/couleur";

type VideoCardProp = {
    src: string;
    titre: string;
    age: string;
};

export const VideoCard = forwardRef<HTMLDivElement, VideoCardProp>(({src, titre, age}, ref) => {

  const [size, setSize] = useState({width: 0, height: 0});

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
    <div className="p-4  w-full flex justify-center">
      <div className="  flex flex-col items-center rounded-lg" style={{background: COLORS.backgroundCard}} >
         <h2 style={{color: COLORS.primary, fontFamily: "Arial Rounded MT Bold"}} className="text-lg sm:text-xl py-4 px-4 md:py-8 md:px-8 lg:px-12 lg:py-12 text-center font-extrabold">
          {titre && <h3>{titre}</h3>}
          {age && <h3>{age}</h3>}
          </h2>         
          <div ref={ref} className="p-4 sm:p-0 sm:pb-8 w-80 sm:w-100 md:w-100">
              <div className="relative flex flex-col items-center justify-center overflow-hidden h-60 sm:h-72 md:h-80">
                  <video 
                      controls 
                      muted 
                      loop 
                      disablePictureInPicture 
                      disableRemotePlayback 
                      ref={videoRef} 
                      className="rounded-lg max-w-full max-h-full w-auto h-auto object-contain"
                  >
                      <source src={src} />
                      Ton navigateur ne supporte pas la vidéo.
                  </video>
              </div>
          </div>
      </div>
  </div>

  </>
  );
});