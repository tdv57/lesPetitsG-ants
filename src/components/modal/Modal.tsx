import { useEffect, useRef } from "react";
import { COLORS } from "../../variables/couleur";

type ModalPropsType = {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    handleClick: () => void;
    modalTitle: string;
}

export function Modal({children, open, onClose, handleClick, modalTitle}: ModalPropsType) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = ref.current;
        if(!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open])

    return (
        <>
            <button 
                onClick={handleClick}
                className="w-full h-10 md:h-20 text-xs rounded-xl flex items-center justify-center lg:text-lg"
                style={{
                background: open
                    ? COLORS.boutonInterieurClique
                    : COLORS.boutonInterieurNonClique,
                border: `2px solid ${
                    open ? COLORS.boutonBordClique : COLORS.boutonBordNonClique
                }`,
                fontFamily: "Fredoka",
                }}
                >
                    {modalTitle}
            </button>
            <dialog
            ref={ref}
            onClose={onClose} 
            onClick={(e) => {
                if (e.target === ref.current) onClose();
            }}
            >
            {children}
            <button type="button" onClick={onClose}>Fermer</button>
            </dialog>
        </>

    );
}