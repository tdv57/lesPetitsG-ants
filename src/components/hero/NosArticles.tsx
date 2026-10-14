import { useMemo, useState } from "react";
import { COLORS } from "../../variables/couleur";
import {getArticles, NOMS_ARTICLES } from "../../service/ArticleService";
import { type NOMS_ARTICLES_TYPE } from "../../service/ArticleService";
import { Article } from "../card/Article";
import { Select } from "../card/Select";
import { useMarqueName } from "../../hook/useMarqueName";
import { TypeArticleValue, type TypeArticleEnum } from "../../enum/TypeArticleEnum";
import { useQuery } from "@tanstack/react-query";
import { GenreEnumOption, GenreEnumValue } from "../../enum/GenreEnum";
import { ThemeEnumOption, ThemeEnumValue } from "../../enum/ThemeEnum";
import { getEditeur } from "../../service/EditeurService";
import { AgeEnumOption, AgeEnumValue, IsInAge, type AgeEnum } from "../../enum/AgeEnum";

export function NosArticles() {

    const {marques} = useMarqueName();
    const [isActive, setIsActive] = useState<TypeArticleEnum>(TypeArticleValue.JOUET);
    const [selectedMarque, setSelectedMarque] = useState<string>("Toutes");
    const [selectedGenre, setSelectedGenre] = useState<string>(GenreEnumValue.TOUS);
    const [selectedTheme, setSelectedTheme] = useState<string>(ThemeEnumValue.TOUS);
    const [selectedEditeur, setSelectedEditeur] = useState<string>("Tous");
    const [selectedAges, setSelectedAges] = useState<Partial<Record<TypeArticleEnum, string>>>({});
    const selectedAge = selectedAges[isActive] ?? AgeEnumValue.TOUS;

    function setSelectedAge(value: string) {
        setSelectedAges((prev) => ({ ...prev, [isActive]: value }));
    }

    const { data: articles = []} = useQuery({
        queryKey: ["articles", isActive],
        queryFn: () => getArticles(isActive)
    });

    const { data: editeurs = [] } = useQuery({
        queryKey: ["editeurs"],
        queryFn: () => getEditeur()
    });

    const filteredArticles = useMemo(() => {
        let filteredArticles = articles;

        if (isActive === TypeArticleValue.PELUCHE) {
            if (selectedMarque !== "Toutes") {
                return filteredArticles.filter((a) => a.marque === selectedMarque);
            }
            return filteredArticles;
        }

        if (selectedAge !== AgeEnumValue.TOUS) {
            filteredArticles = filteredArticles.filter((a) => IsInAge(a.age, a.typeAge, selectedAge as AgeEnum));
        }

        if (isActive === TypeArticleValue.DEGUISEMENT) {
            if (selectedGenre !== GenreEnumValue.TOUS) {
                filteredArticles = filteredArticles.filter((a) => a.genre === selectedGenre);
            }
            if (selectedTheme !== ThemeEnumValue.TOUS) {
                filteredArticles = filteredArticles.filter((a) => a.theme === selectedTheme);
            }
            return filteredArticles;
        }

        if (isActive === TypeArticleValue.LIVRE) {
            if (selectedEditeur !== "Tous") {
                return filteredArticles.filter((a) => a.marque === selectedEditeur); 
            }
            return filteredArticles;
        }

        return filteredArticles;
    },
        [articles, isActive, selectedMarque, selectedGenre, selectedTheme, selectedEditeur, selectedAge]
    );

    function getButtonStyle(nomArticle: NOMS_ARTICLES_TYPE) {
        if (nomArticle === isActive) {
            return ({
                    background: COLORS.boutonInterieurClique,
                    border: `2px solid ${COLORS.boutonBordClique}`,  
                    fontFamily: "Fredoka", 
                    color: COLORS.textLight
                });
            }
        else {
            return (
                {
                    background: COLORS.boutonInterieurNonClique,
                    border: `2px solid ${COLORS.boutonBordNonClique}`,  
                    fontFamily: "Fredoka", 
                }
            );
        }
    }

    function handleButton(nomArticle: NOMS_ARTICLES_TYPE) {
        setIsActive(nomArticle);
    }

    return (
        <>
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)]"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
                NOS ARTICLES
            </h2>  
            <div className="flex justify-center ">
                <div 
                    className="w-180 lg:w-full lg:max-w-[1550px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-[clamp(1rem,4vw,4rem)] gap-y-4 place-items-center p-4"
                    style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
                >
                    { NOMS_ARTICLES.map((nomArticle, index) => {
                        return (
                            <button 
                                className="w-60 h-10 md:w-40 md:h-20 lg:w-[clamp(14rem,16vw,20rem)] lg:h-[clamp(7rem,8vw,10rem)] text-xs lg:text-base rounded-xl flex items-center justify-center "
                                key={index} 
                                onClick={() => handleButton(nomArticle)}
                                style={getButtonStyle(nomArticle)}
                                
                                >
                                    {nomArticle}
                                </button>
                        )
                    })}
                </div>
                
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start items-center gap-4 lg:text-lg">
            {isActive !== TypeArticleValue.PELUCHE && 
                <Select options={AgeEnumOption} selected={selectedAge} setSelected={setSelectedAge} title="Tranche d'âge"/>
            }
            {isActive===TypeArticleValue.PELUCHE && 
                <Select options={marques} selected={selectedMarque} setSelected={setSelectedMarque} title="Marque"/> 
            }
            {isActive===TypeArticleValue.LIVRE && 
                <Select options={[{ label: "Tous", value: "Tous" }, ...editeurs.map((editeur) => ({ label: editeur, value: editeur }))]} selected={selectedEditeur} setSelected={setSelectedEditeur} title="Éditeur"/> 
            }
            {isActive===TypeArticleValue.DEGUISEMENT && 
                <>
                <Select options={GenreEnumOption} selected={selectedGenre} setSelected={setSelectedGenre} title="Genre"/> 
                <Select options={ThemeEnumOption} selected={selectedTheme} setSelected={setSelectedTheme} title="Theme"/> 
                </>

            }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center p-4">
            {
                filteredArticles.map((item, index) => {
                    return (
                        <Article 
                            key={index}
                            url={item.url} 
                            marque={"marque" in item ? item.marque : null}
                            nom={"description" in item ? item.description : null}
                            age={item.age}
                            typeAge={item.typeAge}
                        />
                    );
                })
            }
            </div> 
        </>
    );
}