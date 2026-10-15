import type { TypeAgeEnum } from "../enum/TypeAgeEnum";
import type { TypeImageEnum } from "../enum/TypeImageEnum";


export type MarqueSelect = {
        url: string,
        id: number,
        typeImage : TypeImageEnum,
        marque: string,
        createdAt: Date
}

export type SupabaseImage = {
    id: number;
    created_at: string;
    url: string;
    description: string | null;
    age: number | null;
    type_age: string | null;
    marque: string ;
    code: string;
    type_image: TypeImageEnum;
    genre: string | null;
    theme: string | null;
};

export type ImageSelect = {
    url: string;
    id: number;
    typeImage: TypeImageEnum;
    marque?: string;
    age?: number;
    typeAge?: TypeAgeEnum;
    description?: string;
    createdAt: Date;
    theme?: string;
    genre?: string;
};