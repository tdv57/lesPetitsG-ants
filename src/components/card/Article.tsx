// Le but c'est de faire un composant qui puisse accueillir de nombreux attributs pour s'adapter à n'import quel type d'article

import { motion } from "motion/react"
import { COLORS } from "../../variables/couleur"

export type ArticlePropsType = {
    url: string;
    marque?: string | null; 
    nom?: string | null; 
    age?: string | null; 
}

export function Article({ url, marque, nom, age }: ArticlePropsType) {

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
                <div className="flex-col flex h-full w-full items-center">
                    { getNomAndAge() && 
                    (<div className="shrink-0">
                        <h3 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="text-xs md:text-sm lg:text-2xl text-center">{nom}</h3> 
                        <h3 style={{color: COLORS.primary, fontFamily: "Fredoka"}} className="text-xs md:text-xs lg:text-lg text-center">{age}</h3>                     
                    </div>)
 }
                    <div className="flex-1 flex items-center justify-center">
                        <img alt={`${getDescription()}`} src={`${url}`} className="mx-auto block py-2 md:py-4 max-w-40 lg:max-w-[75%]"></img>
                    </div>
                </div>
            </motion.div>
        </>
    );

}