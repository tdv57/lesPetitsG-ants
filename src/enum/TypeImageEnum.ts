export const TypeImageEnumValue = {
    MARQUE: 'MARQUE',
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
    LOISIR_CREATIF: 'LOISIR CREATIF',
    DEGUISEMENT: 'DEGUISEMENT',
    LIVRE: 'LIVRE',
} as const;

export type TypeImageEnum = (typeof TypeImageEnumValue) [keyof typeof TypeImageEnumValue];

export const typeImageCollection =(({
    items: [
        {label: "Marque", value: TypeImageEnumValue.MARQUE},
        {label: "Jouet", value: TypeImageEnumValue.JOUET},
        {label: "Jeu de société", value: TypeImageEnumValue.JEU_DE_SOCIETE},
        {label: "Peluche", value: TypeImageEnumValue.PELUCHE},
        {label: "Loisir créatif", value: TypeImageEnumValue.LOISIR_CREATIF},
        {label: "Déguisement", value: TypeImageEnumValue.DEGUISEMENT},
        {label: "Livre", value: TypeImageEnumValue.LIVRE}
    ]
}));
