import type { TypeAgeEnum } from "../enum/TypeAgeEnum";
import type { ImageSelect, SupabaseImage } from "../types/ImageType";

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