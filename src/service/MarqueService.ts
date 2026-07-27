import {MARQUES} from "../variables/marque"

export const fetchMARQUES = (page: number, limite: number) => {
    return MARQUES.slice((page-1)*limite, page*limite );
}

export function getAllMarqueName(): {label: string, value: string}[] {
    return (
        [
            {
                label: "Toutes",
                value: "Toutes nos marques"
            },
            {
                label: "Moulin Roty",
                value: "Moulin Roty"
            },
            {
                label: "Jellycat",
                value: "Jellycat"
            }
        ]
    )
}