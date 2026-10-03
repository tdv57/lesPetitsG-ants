export const TypeArticleValue = {
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
    LOISIR_CREATIF: 'LOISIR CREATIF',
    DEGUISEMENT: 'DEGUISEMENT',
    LIVRE: 'LIVRE',
} as const;

export type TypeArticleEnum = (typeof TypeArticleValue)[keyof typeof TypeArticleValue];