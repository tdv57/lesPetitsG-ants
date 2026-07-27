import { useContext } from "react";
import { VideoDuMomentContext } from "../components/context/VideoDuMomentProvider";

export function useVideoDuMoment() {
    const context = useContext(VideoDuMomentContext);
    if (! context) {
        throw new Error("useVideoDuMoment doit être utilisé à l'intérieur d'un VideoDuMomentProvider");
    }
    return context;
}