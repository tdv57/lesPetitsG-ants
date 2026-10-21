interface MenuProps {
    nom: string,
    url: string
}

export const MENU_NOM : MenuProps[] = [
    {
        nom:"Accueil",
        url: "/"
    }, 
    {
        nom: "Nos annonces",
        url: "/annonces"
    },
    {
        nom: "Nos articles",
        url : "/articles"
    }, 
    {
        nom: "L'article de la saison",
        url: "/article-de-la-saison"
    },
    {
        nom: "Les vidéos du moment",
        url: "/les-videos-du-moment"
    }, 
    {
        nom: "Nos marques phares",
        url: "/marques"
    }, 
    ];
