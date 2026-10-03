import { mapImageSelectFromSupabase } from "../mapper/ImageMapper";
import type { IMAGE_SELECT_TYPE, ImageSelect, TYPE_IMAGE_TYPE } from "../types/ImageType";
import { supabase, TABLE_IMAGE } from "./VideoService";

export async function getImageByType(typeImage: TYPE_IMAGE_TYPE) : Promise<ImageSelect[]>  {
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", typeImage);
    if (error) {
        console.log("getImageError : ", error);
        return [];
    } else {
        return data.map(d => mapImageSelectFromSupabase(d)) as IMAGE_SELECT_TYPE[];
    }
}