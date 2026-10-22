export const QueryKeys = {
    videos: {
        _all: ["videos"] as const,
        duMoment: () => [...QueryKeys.videos._all, "du-moment"] as const,
        deLaSaison: () => [...QueryKeys.videos._all, "de-la-saison"] as const,
    },
    
}