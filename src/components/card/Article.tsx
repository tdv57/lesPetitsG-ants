// Le but c'est de faire un composant qui puisse accueillir de nombreux attributs pour s'adapter à n'import quel type d'article

import { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react"
import { COLORS } from "../../variables/couleur"
import { mapAge } from "../../mapper/UtilsMapper";
import type { TypeAgeEnum } from "../../enum/TypeAgeEnum";

export type ArticlePropsType = {
    url: string;
    marque?: string | null; 
    nom?: string | null; 
    age?: number;
    typeAge?: TypeAgeEnum; 
}

export function Article({ url, marque, nom, age, typeAge }: ArticlePropsType) {

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    // Réduit la taille du texte jusqu'à ce qu'il tienne dans la place laissée par l'image
    const fitText = useCallback(() => {
        const box = textRef.current;
        if (!box) return;
        const titles = Array.from(box.querySelectorAll<HTMLElement>("h3"));
        titles.forEach((t) => (t.style.fontSize = ""));
        const natural = titles.map((t) => parseFloat(getComputedStyle(t).fontSize));
        let scale = 1;
        while (box.scrollHeight > box.clientHeight + 1 && scale > 0.5) {
            scale -= 0.05;
            titles.forEach((t, i) => (t.style.fontSize = `${natural[i] * scale}px`));
        }
    }, []);

    useEffect(() => {
        fitText();
        const wrapper = wrapperRef.current;
        if (!wrapper) return;
        const observer = new ResizeObserver(fitText);
        observer.observe(wrapper);
        return () => observer.disconnect();
    }, [fitText, nom, age, typeAge]);

    function getDescription() : string {
        if (marque) return marque;
        else if (nom && age ) return nom + " " + age;
        else return "";
    }

    function getNomAndAge(): string {
        if (nom && age) return nom + "\n\n" + age;
        return "";
    }

    return (
        <>
            <motion.div   
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                style={{background: COLORS.backgroundCard}} 
                className="px-8 w-50 sm:w-50 md:w-60 h-75 sm:h-70 md:h-80 lg:w-[clamp(15rem,20vw,26rem)] lg:h-[clamp(20rem,28vw,34rem)] rounded-4xl"
            >
                <div ref={wrapperRef} className="flex-col flex h-full w-full items-center">
                    { getNomAndAge() && 
                    (<div ref={textRef} className="min-h-0 overflow-hidden">
                        <h3 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="text-xs md:text-sm lg:text-lg text-center">{nom}</h3> 
                        <h3 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="text-xs md:text-xs lg:text-lg text-center">{mapAge(age, typeAge)}</h3>                     
                    </div>)
 }
                    <div className="flex-1 shrink-0 flex items-center justify-center">
                        <img alt={`${getDescription()}`} src={`${url}`} className="mx-auto block py-2 md:py-4 max-w-40 lg:max-w-[75%]" onLoad={fitText}></img>
                    </div>
                </div>
            </motion.div>
        </>
    );

}