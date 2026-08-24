import type { MarqueSelect } from "../../types/ImageType";
import { COLORS } from "../../variables/couleur";
import {motion} from "motion/react";

type Props = {
    marque: MarqueSelect
};

export default function MarqueCard({marque} : Props) {

    return (
        <>
        <motion.div   
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{background: COLORS.backgroundCard}} 
            className="px-8 w-30 sm:w-50 h-50 sm:h-75 rounded-4xl overflow-hidden"
        >
            <div className="flex-col flex h-full w-full items-center">
                <h3 style={{color: COLORS.primary, fontFamily: "Arial Rounded MT Bold"}} className="text-sm md:text-xl text-center font-extrabold py-2 md:py-4">
                    {marque.marque}
                </h3>
                <div className="flex-1 flex items-center justify-center w-20 sm:w-40 min-h-0 py-2 md:py-4">
                    <img 
                        alt={`${marque.marque}`} 
                        src={`${marque.url}`} 
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                </div>
            </div>
        </motion.div>
        </>
    )
}