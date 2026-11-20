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
    onOpen: () => void;
}

export function ImageListeCard({image, onDelete, onOpen, sizeClassName = "w-full aspect-[3/4] max-h-[60vh]"} : ImageListeCardPropsType) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div data-video-card className="flex flex-col items-center gap-4 p-4 w-64 sm:w-72 lg:w-80 rounded-4xl" style={{background: COLORS.backgroundCard}} >
            <div onClick={onOpen} className={`relative cursor-pointer flex items-center justify-center overflow-hidden rounded-2xl ${sizeClassName}`}>
                <img
                    id={image.code}
                    alt={`${image.code} -- ${image.id} -- ${image.userId}`}
                    src={ListeClient.R2_BUCKET_LISTE + "/" + image.code}
                    className="w-full h-full object-contain"
                />
            </div>
            <Modal buttonClassName="w-full shrink-0" modalTitle={"Supprimer cette image"} handleClick={() => setOpen(true)} open={open} onClose={() => setOpen(false)}>
                <ConfirmationSuppressionCard onDelete={onDelete}/>
            </Modal>
        </div>
    )
}