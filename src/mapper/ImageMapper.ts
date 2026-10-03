import type { DeguisementSelect, ImageSelect, JeuDeSocieteSelect, JouetSelect, LivreSelect, LoisirCreatifSelect, MarqueSelect, PelucheSelect, SupabaseImage } from "../types/ImageType";
import { mapAge } from "./UtilsMapper";

export function mapImageSelectFromSupabase(s: SupabaseImage): ImageSelect {
    return {
        url: s.url,
        id: s.id,
        typeImage: s.type_image,
        marque: s.marque,
        age: s.age && s.type_age ? mapAge(s.age, s.type_age as 'ANS' | 'MOIS') : undefined,
        description: s.description ? s.description : undefined,
        createdAt: new Date(s.created_at),
        theme: s.theme ? s.theme : undefined,
        genre: s.genre ? s.genre : undefined
    };
}

export function mapMarqueFromSupabase(s: SupabaseImage): MarqueSelect {
  return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapPelucheFromSupabase(s: SupabaseImage): PelucheSelect {
  return {
        id: s.id,
        url: s.url,
        marque: s.marque,
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapJouetFromSupabase(s: SupabaseImage): JouetSelect {
  return {
        id: s.id,
        url: s.url,
        age:(s.age && s.type_age) ? mapAge(s.age, s.type_age as "ANS" | "MOIS") : undefined,
        description: s.description ? s.description : "",
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}

export function mapJeuDeSocieteFromSupabase(s: SupabaseImage): JeuDeSocieteSelect {
  return {
        id: s.id,
        url: s.url,
        age:(s.age && s.type_age) ? mapAge(s.age, s.type_age as "ANS" | "MOIS") : undefined,
        description: s.description ? s.description : "",
        typeImage: s.type_image,
        createdAt: new Date(s.created_at),
    }
}


export function mapToPelucheSelect(image: ImageSelect) : PelucheSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        marque: image.marque ? image.marque : "",
        createdAt: image.createdAt
    }
}

export function mapToJouetSelect(image: ImageSelect) : JouetSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description : image.description ? image.description : "",
        createdAt: image.createdAt
    }
}

export function mapToJeuDeSocieteSelect(image: ImageSelect) : JeuDeSocieteSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description : image.description ? image.description : "",
        createdAt: image.createdAt
    }
}

export function mapToMarqueSelect(image: ImageSelect) : MarqueSelect {
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        marque: image.marque ? image.marque : "",
        createdAt: image.createdAt
    }
}

export function mapToDeguisementSelect(image: ImageSelect): DeguisementSelect {
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description: image.description ? image.description : "",
        createdAt: image.createdAt,
        genre: image.genre ? image.genre : "",
        theme: image.theme ? image.theme : ""
    };
}

export function mapToLivreSelect(image: ImageSelect): LivreSelect {
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description: image.description ? image.description : "",
        marque: image.marque ? image.marque : "",
        createdAt: image.createdAt,
    };
}

export function mapToLoisirCreatifSelect(image: ImageSelect): LoisirCreatifSelect{
    return {
        url: image.url,
        id: image.id, 
        typeImage: image.typeImage,
        age: image.age ? image.age : "",
        description: image.description ? image.description : "",
        createdAt: image.createdAt,
    };
}