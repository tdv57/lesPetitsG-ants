import { TypeArticleEnumValue, type TypeArticleEnum } from "../enum/TypeArticleEnum";
import type { ImageSelect } from "../types/ImageType";
import { getImageByType } from "./ImageService";

export async function getArticles(type: TypeArticleEnum): Promise<ImageSelect[]> {
    return (await getImageByType(type));
}

export const NOMS_ARTICLES = Object.values(TypeArticleEnumValue);
export type NOMS_ARTICLES_TYPE = (typeof NOMS_ARTICLES)[number];