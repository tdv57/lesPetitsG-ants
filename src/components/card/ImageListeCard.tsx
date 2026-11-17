import { useState } from "react";
import { ListeClient } from "../../client/ListeClient"
import type { ImageListeSelectType } from "../../types/ListeType"
import { COLORS } from "../../variables/couleur"
import { Modal } from "../modal/Modal";
import { ConfirmationSuppressionCard } from "./ConfirmationSuppressionCard";

type ImageListeCardPropsType = {
    image : ImageListeSelectType;
    sizeClassName?: string;
    onDelete: () => void;
}

export function ImageListeCard({image, onDelete, sizeClassName = "w-80 sm:w-100 md:w-100 h-60 sm:h-72 md:h-80"} : ImageListeCardPropsType) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="p-4  w-full h-full flex justify-center">
                <div data-video-card className="px-8 w-50 sm:w-50 md:w-60 h-75 sm:h-70 md:h-80 lg:w-[clamp(15rem,20vw,26rem)] lg:h-[clamp(20rem,28vw,34rem)] rounded-4xl" style={{background: COLORS.backgroundCard}} >
                    <div className="p-4 pb-8 sm:py-0 sm:pb-8 w-full flex justify-center">
                        <div className={`relative flex flex-col items-center justify-center overflow-hidden ${sizeClassName}`}>
                            <img
                                id={image.code}
                                alt={`${image.code} -- ${image.id} -- ${image.userId}`}
                                src={ListeClient.R2_BUCKET_LISTE + "/" + image.code}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <Modal modalTitle={"Supprimer cette image"} handleClick={() => setOpen(true)} open={open} onClose={() => setOpen(false)}>
                        <ConfirmationSuppressionCard onDelete={onDelete}/>
                    </Modal>
                </div>
            </div>
        </>
    )
}