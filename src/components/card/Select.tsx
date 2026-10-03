import { useEffect, useRef, useState } from "react";
import { COLORS } from "../../variables/couleur";
import { AnimatePresence, motion } from "motion/react";

type SelectPropType = {
    options: {
    label: string;
    value: string;
    }[];
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>
    title?: string
}

export function Select({options, selected, setSelected, title} : SelectPropType) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(options.find((option) => option.label===selected)?.value);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    
    return (
        <div ref={containerRef} className="relative w-60 md:w-40">
            {title && (
                <p
                    className="mb-1 text-xs text-center"
                    style={{ fontFamily: "Arial Rounded MT Bold", color: COLORS.primary }}
                >
                    {title}
                </p>
            )}
        <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full h-10 md:h-20 text-xs rounded-xl flex items-center justify-center"
            style={{
            background: isOpen
                ? COLORS.boutonInterieurClique
                : COLORS.boutonInterieurNonClique,
            border: `2px solid ${
                isOpen ? COLORS.boutonBordClique : COLORS.boutonBordNonClique
            }`,
            fontFamily: "Arial Rounded MT Bold",
            }}
        >
            {currentValue}
        </button>

        <AnimatePresence>
            {isOpen && (
            <motion.ul
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-full rounded-xl overflow-hidden z-10 shadow-md"
                style={{
                background: COLORS.boutonInterieurNonClique,
                border: `2px solid ${COLORS.boutonBordNonClique}`,
                }}
            >
                {options.map((option, index) => (
                <li
                    key={index}
                    onClick={() => {
                    setSelected(option.label);
                    setIsOpen(false);
                    setCurrentValue(option.value)
                    }}
                    className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 flex items-center justify-center"
                    style={{
                    fontFamily: "Arial Rounded MT Bold",
                    fontWeight: option.label === selected ? "bold" : "normal",
                    }}
                >
                    {option.value}
                </li>
                ))}
            </motion.ul>
            )}
        </AnimatePresence>
        </div>
    );
}