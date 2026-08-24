import { createContext, useEffect, useState, type ReactNode } from "react";
import { getAllMarqueName } from "../../service/MarqueService";

type MarqueNameContextType = {
    marques: {
        label: string;
        value: string;
    }[],
    setMarques:React.Dispatch<React.SetStateAction<
    {
        label: string;
        value: string;
    }[]>>; 
}

export const MarqueNameContext = createContext<MarqueNameContextType | null>(null);

export function MarqueNameProvider({children} : {children: ReactNode}) {
    const [marques, setMarques] = useState<{
        label: string;
        value: string;
    }[]>([]);

    useEffect(() => {
        getAllMarqueName().then((v) => {
            setMarques(v);
        })
    }, [])

    return (
        <MarqueNameContext.Provider value={{marques, setMarques}}>
            {children}
        </MarqueNameContext.Provider>
    )
}