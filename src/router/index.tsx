import { createBrowserRouter} from "react-router";
import Accueil from "../components/hero/Accueil";
import ArticleDeLaSaison from "../components/hero/ArticleDeLaSaison";
import Marques from "../components/hero/Marques";
import NotFound from "../components/hero/NotFound";
import App from "../App";
import LesVideosDuMoment from "../components/hero/LesVideosDuMoment";
import { NosArticles } from "../components/hero/NosArticles";
import { NosActualites } from "../components/hero/NosActualites";
import { Liste } from "../components/hero/Liste";

export const router = createBrowserRouter([{
    children : 
    [
        {
            path: "/",
            element: <Accueil />,
        },
        {
            path: "/article-de-la-saison",
            element: <ArticleDeLaSaison />,
        },
        {
            path: "/marques",
            element: <Marques/>,
        },
        {
            path: "/les-videos-du-moment",
            element: <LesVideosDuMoment/>
        },
        {
            path: "/articles",
            element: <NosArticles/>
        },
        {
            path: "/actualites",
            element: <NosActualites/>
        },
        {
            path: "/liste",
            element: <Liste/>
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ],
    element: <App/>
}]);