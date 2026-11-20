import type { TypeArticleEnum } from "../enum/TypeArticleEnum";

export const QueryKeys = {
    videos: {
        _all: ["videos"] as const,
        duMoment: () => [...QueryKeys.videos._all, "du-moment"] as const,
        deLaSaison: () => [...QueryKeys.videos._all, "de-la-saison"] as const,
    },
    marques: {
        _all: ['marques'] as const, 
        findAll: () => [...QueryKeys.marques._all, "find-all"] as const,
        infiniteScroll: () => [...QueryKeys.marques._all, "infinite-scroll"] as const,
        editeur: () => [...QueryKeys.marques._all, "editeurs"] as const,
    },
    annonces: {
        _all: ['annonces'] as const,
        findAll: () => [...QueryKeys.annonces._all, "find-all"] as const,
    },
    articles: {
        _all: ['articles'] as const,
        byArticle: (article: TypeArticleEnum) => [...QueryKeys.articles._all, article] as const,
    },
    listeDossier: {
        _all: ['liste_dossier'] as const,
        findAll: () => [...QueryKeys.listeDossier._all, "find-all"] as const,
    },
    listeImage: {
        _all: ['liste_image'] as const,
        findByDossier: (dossierId: number | undefined) => [...QueryKeys.listeImage._all, dossierId]
    }
    
}