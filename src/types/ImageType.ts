
export const TYPE_IMAGE_VALUE = {
    MARQUE: 'MARQUE',
    PELUCHE: 'PELUCHE',
    JEU_DE_SOCIETE: 'JEU DE SOCIETE',
    JOUET: 'JOUET',
    LOISIR_CREATIF: 'LOISIR CREATIF',
    DEGUISEMENT: 'DEGUISEMENT',
    LIVRE: 'LIVRE',
} as const;

export type TYPE_IMAGE_TYPE = (typeof TYPE_IMAGE_VALUE) [keyof typeof TYPE_IMAGE_VALUE];

export const typeImageCollection =(({
    items: [
        {label: "Marque", value: TYPE_IMAGE_VALUE.MARQUE},
        {label: "Jouet", value: TYPE_IMAGE_VALUE.JOUET},
        {label: "Jeu de société", value: TYPE_IMAGE_VALUE.JEU_DE_SOCIETE},
        {label: "Peluche", value: TYPE_IMAGE_VALUE.PELUCHE},
        {label: "Loisir créatif", value: TYPE_IMAGE_VALUE.LOISIR_CREATIF},
        {label: "Déguisement", value: TYPE_IMAGE_VALUE.DEGUISEMENT},
        {label: "Livre", value: TYPE_IMAGE_VALUE.LIVRE}
    ]
}));

export type MarqueSelect = {
        url: string,
        id: number,
        typeImage : TYPE_IMAGE_TYPE,
        marque: string,
        createdAt: Date
}

export type JouetSelect = {
    url: string,
    id: number,
    typeImage : TYPE_IMAGE_TYPE,
    age?: string,
    description: string,
    createdAt: Date
}

export type JeuDeSocieteSelect = {
    url: string,
    id: number,
    typeImage : TYPE_IMAGE_TYPE,
    age?: string,
    description: string,
    createdAt: Date    
}

export type PelucheSelect = {
    url: string,
    id: number,
    typeImage : TYPE_IMAGE_TYPE,
    marque:string, 
    createdAt: Date    
}

export type LoisirCreatifSelect =  {
    url: string,
    id: number,
    typeImage : TYPE_IMAGE_TYPE,
    age?: string,
    description: string,
    createdAt: Date
}

export type LivreSelect = {
    url: string,
    id: number,
    typeImage : TYPE_IMAGE_TYPE,
    age?: string,
    description: string,
    marque: string,
    createdAt: Date
}

export type DeguisementSelect = {
    url: string,
    id: number,
    typeImage: TYPE_IMAGE_TYPE,
    age?: string,
    description: string,
    createdAt: Date,
    genre: string,
    theme: string
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
    type_image: TYPE_IMAGE_TYPE;
    genre: string | null;
    theme: string | null;
};

export type ImageSelect = {
    url: string;
    id: number;
    typeImage: TYPE_IMAGE_TYPE;
    marque?: string;
    age?: string;
    description?: string;
    createdAt: Date;
    theme?: string;
    genre?: string;
};

export type IMAGE_SELECT_TYPE =  MarqueSelect | JeuDeSocieteSelect | JouetSelect | PelucheSelect;
