import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { COLORS } from "../../variables/couleur";

export function LoadingCard({sizeClassName = "w-80 sm:w-100 md:w-100 h-60 sm:h-72 md:h-80"}) {
  return (
    <div className="p-4  w-full h-full flex justify-center">
      <div data-video-card className="  flex flex-col items-center justify-between h-full md:w-full rounded-lg" style={{background: COLORS.backgroundCard}} >
         <h2 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="py-4 px-4 md:py-8 md:px-8 lg:px-12 lg:py-12 text-center md:h-[11rem] lg:h-[13rem] md:flex md:flex-col md:justify-center md:overflow-hidden">
          </h2>         
          <div className="p-4 sm:px-8 md:px-4 sm:py-0 sm:pb-8 lg:px-4 w-full flex justify-center">
              <div className={`relative flex flex-col items-center justify-center overflow-hidden ${sizeClassName}`}>
                <DotLottieReact
                src="/assets/elephant.lottie"
                loop
                autoplay
                />
              </div>
          </div>
      </div>
    </div>
  );
}