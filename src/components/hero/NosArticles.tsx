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

export function NosArticles() {

    const {marques} = useMarqueName();
    const [isActive, setIsActive] = useState<TypeArticleEnum>(TypeArticleValue.JOUET);
    const [selectedMarque, setSelectedMarque] = useState<string>("Toutes");
    const [selectedGenre, setSelectedGenre] = useState<string>(GenreEnumValue.TOUS);
    const [selectedTheme, setSelectedTheme] = useState<string>(ThemeEnumValue.TOUS);

    const { data: articles = [], isLoading, isError } = useQuery({
        queryKey: ["articles", isActive],
        queryFn: () => getArticles(isActive)
    });

    const filteredArticles = useMemo(() => {
        if (isActive === TypeArticleValue.PELUCHE && selectedMarque !== "Toutes") {
            return articles.filter((a) => a.marque === selectedMarque);
        }
        if (isActive === TypeArticleValue.DEGUISEMENT) {
            let filteredArticles = articles;
            if (selectedGenre !== GenreEnumValue.TOUS) {
                filteredArticles = filteredArticles.filter((a) => a.genre === selectedGenre);
            }
            if (selectedTheme !== ThemeEnumValue.TOUS) {
                filteredArticles = filteredArticles.filter((a) => a.theme === selectedTheme);
            }
            return filteredArticles;
        }
        return articles;
    },
        [articles, isActive, selectedMarque, selectedGenre, selectedTheme]
    );

    function getButtonStyle(nomArticle: NOMS_ARTICLES_TYPE) {
        if (nomArticle === isActive) {
            return ({
                    background: COLORS.boutonInterieurClique,
                    border: `2px solid ${COLORS.boutonBordClique}`,  
                    fontFamily: "Arial Rounded MT Bold", 
                    color: COLORS.textLight
                });
            }
        else {
            return (
                {
                    background: COLORS.boutonInterieurNonClique,
                    border: `2px solid ${COLORS.boutonBordNonClique}`,  
                    fontFamily: "Arial Rounded MT Bold", 
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
                className="text-xl text-center sm:text-3xl lg:text-4xl font-bold pt-12"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Arial Rounded MT Bold" }}
            > 
                NOS ARTICLES
            </h2>  
            <div className="flex justify-center ">
                <div 
                    className="w-180  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 place-items-center p-4"
                    style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Arial Rounded MT Bold" }}
                >
                    { NOMS_ARTICLES.map((nomArticle, index) => {
                        return (
                            <button 
                                className="w-60 h-10 md:w-40 md:h-20 text-xs rounded-xl flex items-center justify-center "
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
            {isActive===TypeArticleValue.PELUCHE && 
                <div className="flex justify-center">
                    <Select options={marques} selected={selectedMarque} setSelected={setSelectedMarque}/> 
                </div>
            }
            {isActive===TypeArticleValue.DEGUISEMENT && 
                <div className="flex justify-center gap-4">
                    <Select options={GenreEnumOption} selected={selectedGenre} setSelected={setSelectedGenre} title="Genre"/> 
                    <Select options={ThemeEnumOption} selected={selectedTheme} setSelected={setSelectedTheme} title="Theme"/> 
                </div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center p-4">
            {
                filteredArticles.map((item, index) => {
                    return (
                        <Article 
                            key={index}
                            url={item.url} 
                            marque={"marque" in item ? item.marque : null}
                            nom={"description" in item ? item.description : null}
                            age={"age" in item ? item.age : null}
                        />
                    );
                })
            }
            </div> 
        </>
    );
}