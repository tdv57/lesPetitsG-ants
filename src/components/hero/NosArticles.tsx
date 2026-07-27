import { useEffect, useState } from "react";
import { COLORS } from "../../variables/couleur";
import { NOMS_ARTICLES } from "../../service/ArticleService";
import { type NOMS_ARTICLES_TYPE, ArticleFunctionMapping } from "../../service/ArticleService";
import type { JouetType } from "../../variables/jouets";
import type { PelucheType } from "../../variables/peluche";
import type { JeuxDeSocieteType } from "../../variables/jeuxDeSociete";
import { Article } from "../card/Article";
import { Select } from "../card/Select";
import { getAllMarqueName } from "../../service/MarqueService";

export function NosArticles() {

    const [isActive, setIsActive] = useState<NOMS_ARTICLES_TYPE>("JOUETS");
    const [articles, setArticles] = useState<{articleType: NOMS_ARTICLES_TYPE, items: (JouetType|PelucheType|JeuxDeSocieteType)[]}[]>([]);
    const [selected, setSelected] = useState<string>("Toutes");
    useEffect(() => {
        setArticles((_) => {
            let newArticles : any[] = [];
            NOMS_ARTICLES.forEach((nomArticle) => {
                newArticles.push({
                    articleType: nomArticle, 
                    items : ArticleFunctionMapping[nomArticle]()
                })
            })
            return newArticles;
        })
    }, []);

    function getArticle() {
        let currentArticle =  articles.find((article: {articleType: NOMS_ARTICLES_TYPE, items: (JouetType | PelucheType | JeuxDeSocieteType)[]}) => {
            return article.articleType === isActive;
        });
        if (isActive === "PELUCHES") {
            let pelucheArticles = (currentArticle?.items as PelucheType[] | undefined)?.filter((peluche) => {
                if (selected === "Toutes") return true;
                return peluche.marque === selected;
            });
            return {
                article: currentArticle?.articleType,
                items: pelucheArticles
            }
        }
        return currentArticle;
    }

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
            {isActive==="PELUCHES" && 
                <div className="flex justify-center">
                    <Select options={getAllMarqueName()} selected={selected} setSelected={setSelected}/> 
                </div>
            
            }
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center p-4">
            {
                getArticle()?.items?.map((item, index) => {
                    return (
                        <Article 
                            key={index}
                            url={item.url} 
                            marque={"marque" in item ? item.marque : null}
                            nom={"nom" in item ? item.nom : null}
                            age={"age" in item ? item.age : null}
                        />
                    );
                })
            }
            </div> 
        </>
    );
}