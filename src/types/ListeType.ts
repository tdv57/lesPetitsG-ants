export type DossierListeSelectType = {
    id: number;
    userId: number;
    createdAt: Date;
    name: string;
}

export type DossierListeInsertType = {
    name: string;
}

export type ImageListeSelectType = {
    id: number;
    userId: number;
    dossierId: number;
    createdAt: Date;
    code: string;
}