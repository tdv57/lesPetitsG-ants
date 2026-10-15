export const TypeArticleEnumValue = {
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
    LOISIR_CREATIF: 'LOISIR CREATIF',
    DEGUISEMENT: 'DEGUISEMENT',
    LIVRE: 'LIVRE',
    BIJOUX: 'BIJOUX',
    DECORATION: 'DECORATION',
    BAGAGERIE: 'BAGAGERIE',
} as const;

export type TypeArticleEnum = (typeof TypeArticleEnumValue)[keyof typeof TypeArticleEnumValue];

export const typeArticleCollection = ({
    items: [
        { label: TypeArticleEnumValue.PELUCHE, value: 'Peluches' },
        { label: TypeArticleEnumValue.JEU_DE_SOCIETE, value: 'Jeux de société' },
        { label: TypeArticleEnumValue.JOUET, value: 'Jouets' },
        { label: TypeArticleEnumValue.LOISIR_CREATIF, value: 'Loisirs créatifs' },
        { label: TypeArticleEnumValue.DEGUISEMENT, value: 'Déguisements' },
        { label: TypeArticleEnumValue.LIVRE, value: 'Livres' },
        { label: TypeArticleEnumValue.BIJOUX, value: 'Bijoux' },
        { label: TypeArticleEnumValue.DECORATION, value: 'Décorations' },
        { label: TypeArticleEnumValue.BAGAGERIE, value: 'Bagageries' }
    ],
});