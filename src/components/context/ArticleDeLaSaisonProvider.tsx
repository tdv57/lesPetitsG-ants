import { createContext, useEffect, useState, type ReactNode } from "react";
import { getVideoArticleDeLaSaison } from "../../service/VideoService";

type ArticleDeLaSaisonContextType = {
    videoData: {
        src: string;
        titre: string;
        age: string;
    } | null;
    setVideoData:React.Dispatch<React.SetStateAction<{
        src: string;
        titre: string;
        age: string;
    } | null>>; 
}

export const ArticleDeLaSaisonContext = createContext<ArticleDeLaSaisonContextType | null>(null);

export function ArticleDeLaSaisonProvider({children} : {children: ReactNode}) {
    const [videoData, setVideoData] = useState< {
        src: string;
        titre: string;
        age: string;
    } | null>(null);

    useEffect(() => {
        getVideoArticleDeLaSaison().then((v) => {
            setVideoData(v);
        })
    }, [])

    return (
        <ArticleDeLaSaisonContext.Provider value={{videoData, setVideoData}}>
            {children}
        </ArticleDeLaSaisonContext.Provider>
    )
}