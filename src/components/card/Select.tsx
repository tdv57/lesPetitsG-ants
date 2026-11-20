import { useEffect, useRef, useState } from "react";
import { COLORS } from "../../variables/couleur";
import { AnimatePresence, motion } from "motion/react";

type SelectPropType<T extends string> = {
    options: {
    label: string;
    value: string;
    }[];
    selected: string;
    setSelected: (prev: T) => void;
    title?: string;
    className?: string;
}

export function Select<T extends string>({options, selected, setSelected, title, className = "w-60 md:w-40"} : SelectPropType<T>) {
    
    const [isOpen, setIsOpen] = useState(false);
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
        <div ref={containerRef} className={`relative ${className}`}>
            {title && (
                <p
                    className="mb-1 text-xs lg:text-xl text-center"
                    style={{ fontFamily: "Fredoka", color: COLORS.primary }}
                >
                    {title}
                </p>
            )}
        <button
            onClick={() => setIsOpen((prev) => !prev)}
            title={selected}
            className="w-full min-w-0 h-10 md:h-20 px-3 text-xs rounded-xl flex items-center justify-center lg:text-lg"
            style={{
            background: isOpen
                ? COLORS.boutonInterieurClique
                : COLORS.boutonInterieurNonClique,
            border: `2px solid ${
                isOpen ? COLORS.boutonBordClique : COLORS.boutonBordNonClique
            }`,
            fontFamily: "Fredoka",
            }}
        >
            <span className="block w-full truncate">{selected}</span>
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
                    setIsOpen(false);
                    setSelected(option.label as T)
                    }}
                    className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-100 flex items-center justify-center lg:text-lg text-center [overflow-wrap:anywhere]"
                    style={{
                    fontFamily: "Fredoka",
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