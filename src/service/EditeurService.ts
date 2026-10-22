import { supabase, TABLE_IMAGE } from "./VideoService";

export async function getEditeur() : Promise<string[]>  {
    const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "MARQUE").eq("is_editeur", 'TRUE');
    if (error) {
        console.log("getEditeurError : ", error);
        return [];
    } else {
        return data.map(d => d.marque) as string[];
    }
}