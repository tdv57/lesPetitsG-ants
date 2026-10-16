import type { TypeImageEnum } from "../enum/TypeImageEnum";
import { mapImageSelectFromSupabase } from "../mapper/ImageMapper";
import type { ImageSelect } from "../types/ImageType";
import { supabase, TABLE_IMAGE } from "./VideoService";

export async function getImageByType(typeImage: TypeImageEnum) : Promise<ImageSelect[]>  {
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", typeImage).order('created_at', { ascending: false });
    if (error) {
        console.log("getImageError : ", error);
        return [];
    } else {
        return data.map(d => mapImageSelectFromSupabase(d)) as ImageSelect[];
    }
}