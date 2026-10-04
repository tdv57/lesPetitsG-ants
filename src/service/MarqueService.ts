import { mapImageSelectFromSupabase } from "../mapper/ImageMapper";
import type {ImageSelect } from "../types/ImageType";
import { getImageByType } from "./ImageService";
import { supabase, TABLE_IMAGE } from "./VideoService";

export const fetchMARQUES = async (page: number, limite: number) => {
    const from = (page-1)*limite;
    const to = (page*limite) - 1;
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "MARQUE").range(from, to);
    if (error) {
        console.log("getImageError : ", error);
        return [];
    } else {
        return data.map(d => mapImageSelectFromSupabase(d)) as ImageSelect[];
    }
}

export async function getAllMarqueNameForPeluche(): Promise<{label: string, value: string}[]> {
    const peluches = await getImageByType("PELUCHE");

    const nomsUniques = new Set(
        peluches
            .map((peluche) => peluche.marque)
            .filter((marque): marque is string => !!marque)
    );

    const marques = Array.from(nomsUniques).map((nom) => ({
        label: nom,
        value: nom,
    }));
    
    return ([            
        {
            label: "Toutes",
            value: "Toutes nos marques"
        },
        ...marques
    ])
}

