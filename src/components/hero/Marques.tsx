import { COLORS } from "../../variables/couleur";
import {fetchMARQUES} from "../../service/MarqueService";
import MarqueCard from "../card/MarqueCard";
import { useEffect, useRef, useState } from "react";
import type { IMAGE_SELECT_TYPE, MarqueSelect } from "../../types/ImageType";

export default function Marques() {
    
    const LIMITE = 9;
    const [page, setPage] = useState(1);
    const [marquesInPage, setMarquesInPage] = useState<MarqueSelect[]>([]);
    const [hasMarquesToFetch, setHasMarquesToFetch] = useState(true);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (!hasMarquesToFetch) return;
        const observer = new IntersectionObserver((entries) => {
                if(!(entries[0].isIntersecting)) return;
                setPage((prev) => prev + 1);
                console.log(page);
                console.log(marquesInPage);
            }
            , {
                threshold: 1,
            });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [hasMarquesToFetch]);

     useEffect(() => {
        fetchMARQUES(1, LIMITE).then((nextMarquesInPage) => {
            if (nextMarquesInPage.length <= 0) {
                setHasMarquesToFetch(false);
                return;
            }
            setMarquesInPage(nextMarquesInPage);
        });
    }, []);

    useEffect(() => {
        if (page === 1) return;

        fetchMARQUES(page, LIMITE).then((nextMarquesInPage) => {
            if (nextMarquesInPage.length <= 0) {
                setHasMarquesToFetch(false);
                return;
            }
            setMarquesInPage((prev) => {
                return [
                    ...prev, 
                    ...nextMarquesInPage,
                ];
            });
        });
    }, [page]);


    return (<>
    <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-2xl md:text-3xl font-bold mb-6 p-12"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Arial Rounded MT Bold" }}
            > 
            NOS MARQUES PHARES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 pb-4 gap-5 sm:gap-5 md:gap-20 justify-center">
                {marquesInPage.map((marque) => {return (<MarqueCard marque={marque} key={marque.id}/>);})}
               
            </div>
            <div ref={loaderRef}></div>
    </section>
    </>);
}