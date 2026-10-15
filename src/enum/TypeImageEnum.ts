import { typeArticleCollection, TypeArticleEnumValue } from "./TypeArticleEnum";

export const TypeImageEnumValue = {
    MARQUE: 'MARQUE',
    ...TypeArticleEnumValue,
} as const;

export type TypeImageEnum = (typeof TypeImageEnumValue)[keyof typeof TypeImageEnumValue];

export const typeImageCollection = ({
    items: [{ label: TypeImageEnumValue.MARQUE, value: 'Marques' }, ...typeArticleCollection.items],
});
