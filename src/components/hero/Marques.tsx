import { COLORS } from "../../variables/couleur";
import {fetchMARQUES} from "../../service/MarqueService";
import MarqueCard from "../card/MarqueCard";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../queries/QueryKeys";

export default function Marques() {
    
    const LIMITE = 9;
    const loaderRef = useRef<HTMLDivElement | null>(null);
    
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: QueryKeys.marques.infiniteScroll(),
        queryFn: ({ pageParam }) => fetchMARQUES(pageParam, LIMITE),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < LIMITE ? undefined : allPages.length + 1,
    });

    const marques = data?.pages.flat() ?? [];

    useEffect(() => {
        const el = loaderRef.current;
        if (!el || !hasNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
            },
            { rootMargin: "200px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);


    return (<>
    <section className="flex flex-col items-center justify-center ">
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)] mb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
            NOS MARQUES PHARES
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 pb-4 gap-5 sm:gap-5 md:gap-20 justify-center">
                {marques.map((marque) => {return (<MarqueCard marque={marque} key={marque.id}/>);})}
               
            </div>
            <div ref={loaderRef}></div>
    </section>
    </>);
}