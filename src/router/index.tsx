import { createBrowserRouter} from "react-router";
import Accueil from "../components/hero/Accueil";
import ArticleDeLaSaison from "../components/hero/ArticleDeLaSaison";
import Marques from "../components/hero/Marques";
import NotFound from "../components/hero/NotFound";
import App from "../App";
import LesVideosDuMoment from "../components/hero/LesVideosDuMoment";
import { NosArticles } from "../components/hero/NosArticles";

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
            path: "*",
            element: <NotFound />,
        },
    ],
    element: <App/>
}]);