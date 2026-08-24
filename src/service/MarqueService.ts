import { mapMarqueFromSupabase, mapToMarqueSelect } from "../mapper/ImageMapper";
import type {MarqueSelect } from "../types/ImageType";
import { getImageByType } from "./ImageService";
import { supabase, TABLE_IMAGE } from "./VideoService";

export const fetchMARQUES = async (page: number, limite: number) => {
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "MARQUE").range((page-1)*limite, page*limite);
    if (error) {
        console.log("getImageError : ", error);
        return [];
    } else {
        return data.map(d => mapToMarqueSelect(mapMarqueFromSupabase(d))) as MarqueSelect[];
    }
}

export async function getAllMarqueName(): Promise<{label: string, value: string}[]> {
    const marques = (await getImageByType("MARQUE")).map((marque) => (
        {
            label: marque.marque? marque.marque : "", 
            value: marque.marque? marque.marque : "" 
        }
    ));
    return ([            
        {
            label: "Toutes",
            value: "Toutes nos marques"
        },
        ...marques
    ])
}

