import { mapJeuDeSocieteFromSupabase, mapJouetFromSupabase, mapMarqueFromSupabase, mapPelucheFromSupabase } from "../mapper/ImageMapper";
import type { IMAGE_SELECT_TYPE, ImageSelect, TYPE_IMAGE_TYPE } from "../types/ImageType";
import { supabase, TABLE_IMAGE } from "./VideoService";

export async function getImageByType(typeImage: TYPE_IMAGE_TYPE) : Promise<ImageSelect[]>  {
    switch(typeImage) {
        case "MARQUE" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "MARQUE");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapMarqueFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        case "JOUET" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "JOUET");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapJouetFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        case "PELUCHE" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "PELUCHE");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapPelucheFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        case "JEU DE SOCIETE" : {
            const {data, error} = await supabase.from(TABLE_IMAGE).select().eq("type_image", "JEU DE SOCIETE");
            if (error) {
                console.log("getImageError : ", error);
                return [];
            } else {
                return data.map(d => mapJeuDeSocieteFromSupabase(d)) as IMAGE_SELECT_TYPE[];
            }
        }
        default: 
            console.log("getImageError type inconnu: ", typeImage);
            return [];
        }
}