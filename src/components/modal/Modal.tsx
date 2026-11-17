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
                background: COLORS.boutonInterieurNonClique,
                border: `2px solid ${
                   COLORS.boutonBordNonClique
                }`,
                fontFamily: "Fredoka",
                }}
                >
                    {modalTitle}
            </button>
            <dialog
            className="m-auto w-[90vw] max-w-xl rounded-xl p-0"
            ref={ref}
            onClose={onClose} 
            onClick={(e) => {
                if (e.target === ref.current) onClose();
            }}
            style={{
            background: COLORS.boutonInterieurNonClique,
            border: `2px solid ${
                COLORS.boutonBordNonClique
            }`,
            fontFamily: "Fredoka",
            }}
            >
            {children}
            <button 
            type="button" onClick={onClose}
            className="block mx-auto cursor-pointer pb-1 whitespace-nowrap text-[clamp(0.6rem,1.45vw,1.125rem)] uppercase tracking-wide transition-colors hover:opacity-80"
            style={{
                color: COLORS.primary,
                fontWeight: 400,
            }}
            >Fermer</button>
            </dialog>
        </>

    );
}