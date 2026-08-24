import { useContext } from "react";
import { MarqueNameContext } from "../components/context/MarqueNameProvider";

export function useMarqueName() {
    const context = useContext(MarqueNameContext);
    if (! context) {
        throw new Error("useMarqueName doit être utilisé à l'intérieur d'un MarqueNameProvider");
    }
    return context;
}