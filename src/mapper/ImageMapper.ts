import type { TypeAgeEnum } from "../enum/TypeAgeEnum";
import type { DeguisementSelect, ImageSelect, JeuDeSocieteSelect, JouetSelect, LivreSelect, LoisirCreatifSelect, MarqueSelect, PelucheSelect, SupabaseImage } from "../types/ImageType";
import { mapAge } from "./UtilsMapper";

export function mapImageSelectFromSupabase(s: SupabaseImage): ImageSelect {
    return {
        url: s.url,
        id: s.id,
        typeImage: s.type_image,
        marque: s.marque,
        age: s.age ? s.age : undefined,
        typeAge: s.type_age? s.type_age as TypeAgeEnum : undefined,
        description: s.description ? s.description : undefined,
        createdAt: new Date(s.created_at),
        theme: s.theme ? s.theme : undefined,
        genre: s.genre ? s.genre : undefined
    };
}