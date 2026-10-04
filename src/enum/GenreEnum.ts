export const GenreEnumValue = {
    TOUS: "TOUS",
    GARCON: "GARCON",
    FILLE: "FILLE"    
} as const;

export type GenreEnum =  (typeof GenreEnumValue)[keyof typeof GenreEnumValue];

export const GenreEnumOption = Object.values(GenreEnumValue).map((genre) => ({
    label: genre,
    value: genre,
}));
