import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type LightBoxCardPropsType = {
    srcs: string[];
    index: number;
    onClose: () => void;
    onChange: (index: number) => void
}

const SWIPE_THRESHOLD = 50;

export function LightBoxCard({srcs, index, onClose, onChange} : LightBoxCardPropsType) {
    const total = srcs.length;
    const touchStartX = useRef<number | null>(null);

    const prev = () => onChange((index - 1 + total) % total);
    const next = () => onChange((index + 1) % total);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (total <= 1) return;
            if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
            if (e.key === "ArrowRight") onChange((index + 1) % total);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [index, total, onClose, onChange]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null || total <= 1) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (delta > SWIPE_THRESHOLD) prev();
        else if (delta < -SWIPE_THRESHOLD) next();
    };

    const roundButton = "absolute flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white cursor-pointer transition-colors";

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={onClose}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <button
                className={`${roundButton} top-4 right-4 w-12 h-12`}
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                aria-label="Fermer"
            >
                <X size={28}/>
            </button>

            {total > 1 && (
                <button
                    className={`${roundButton} top-1/2 -translate-y-1/2 left-2 md:left-4 w-10 h-10 md:w-14 md:h-14`}
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    aria-label="Image précédente"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8"/>
                </button>
            )}

            <img
                src={srcs[index]}
                alt={`Image ${index + 1} sur ${total}`}
                className="max-w-[90vw] max-h-[85vh] object-contain select-none"
                draggable={false}
                onClick={(e) => e.stopPropagation()}
            />

            {total > 1 && (
                <button
                    className={`${roundButton} top-1/2 -translate-y-1/2 right-2 md:right-4 w-10 h-10 md:w-14 md:h-14`}
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    aria-label="Image suivante"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8"/>
                </button>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm" style={{fontFamily: "Fredoka"}}>
                {index + 1} / {total}
            </div>
        </div>,
        document.body
    );
}
