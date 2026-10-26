import type { AnnonceSelect } from "../../types/AnnonceType";
import { COLORS } from "../../variables/couleur";

type AnnonceCardPropsType = {
    annonce: AnnonceSelect;
    sizeClassName?: string;
};

export const AnnonceCard = (({annonce, sizeClassName = "w-80 sm:w-100 md:w-100 h-60 sm:h-72 md:h-80"}: AnnonceCardPropsType) => {

    const image = (
        <img
            id={annonce.code}
            alt={`${annonce.commentaire} -- ${annonce.url}`}
            src={annonce.url}
            className="max-w-full max-h-full w-auto h-auto object-contain"
        />
    );
  return (
  <>
    <div className="p-4  w-full h-full flex justify-center">
      <div data-video-card className="  flex flex-col items-center justify-between h-full w-full rounded-lg" style={{background: COLORS.backgroundCard}} >
         <h2 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="py-8 px-8 lg:px-12 lg:py-12 text-center h-[11rem] lg:h-[13rem] flex flex-col justify-center overflow-hidden">
          {annonce.commentaire && <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl ">{annonce.commentaire}</h3>}
          </h2>         
          <div className="p-4 pb-8 sm:py-0 sm:pb-8 w-full flex justify-center">
              <div className={`relative flex flex-col items-center justify-center overflow-hidden ${sizeClassName}`}>
                {
                    annonce.mediaType === "VIDEO" 
                    &&  <video
                        controls 
                        muted 
                        loop 
                        disablePictureInPicture 
                        disableRemotePlayback 
                        className="rounded-lg max-w-full max-h-full w-auto h-auto object-contain"
                        autoPlay
                    >
                        <source src={annonce.url} />
                        Votre navigateur ne supporte pas la vidéo.
                    </video>
                }
                {
                    annonce.mediaType === "IMAGE"
                    && 
                    <div className="flex-1 flex items-center justify-center w-[85%] min-h-0 py-4">
                        {
                            annonce.redirectionLink ? 
                            <a href={annonce.redirectionLink} target="_blank">
                                {image}
                            </a>
                            :
                            <>
                                {image}
                            </>
                        }
                    </div>
                }

              </div>
          </div>
      </div>
  </div>

  </>
  );
});