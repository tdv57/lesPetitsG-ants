import { createContext, useEffect, useState, type ReactNode } from "react"
import { getVideosDuMoment } from "../../service/VideoService";

type VideoDuMomentContextType = {
    videosDuMoment: {
        src: string;
        titre: string;
        age: string;
    }[]; 
    setVideosDuMoment : React.Dispatch<React.SetStateAction<{
        src: string;
        titre: string;
        age: string;
    }[]>>
}

export const VideoDuMomentContext = createContext<VideoDuMomentContextType | null>(null);

export function VideoDuMomentProvider({children}: {children: ReactNode}) {
    const [videosDuMoment, setVideosDuMoment] = useState<{
            src: string;
            titre: string;
            age: string;
        }[]>([]);

    useEffect(() => {
        getVideosDuMoment().then((v) => {
            setVideosDuMoment(v);
        })
    }, [])

    return (
        <VideoDuMomentContext.Provider value={{videosDuMoment, setVideosDuMoment}}>
            {children}
        </VideoDuMomentContext.Provider>
    )
}