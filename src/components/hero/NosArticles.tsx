import { useMemo, useState } from "react";
import { COLORS } from "../../variables/couleur";
import {getArticles } from "../../service/ArticleService";
import { type NOMS_ARTICLES_TYPE } from "../../service/ArticleService";
import { Article } from "../card/Article";
import { Select } from "../card/Select";
import { useMarqueName } from "../../hook/useMarqueName";
import { typeArticleCollection, TypeArticleEnumValue, type TypeArticleEnum } from "../../enum/TypeArticleEnum";
import { useQuery } from "@tanstack/react-query";
import { GenreEnumOption, GenreEnumValue } from "../../enum/GenreEnum";
import { ThemeEnumOption, ThemeEnumValue } from "../../enum/ThemeEnum";
import { getEditeur } from "../../service/EditeurService";
import { AgeEnumOption, AgeEnumValue, IsInAge, type AgeEnum } from "../../enum/AgeEnum";
import { QueryKeys } from "../../queries/QueryKeys";

export function NosArticles() {

    const {data: marques = []} = useMarqueName();
    const [isActive, setIsActive] = useState<TypeArticleEnum>(TypeArticleEnumValue.JOUET);
    const [selectedMarque, setSelectedMarque] = useState<string>("Toutes");
    const [selectedGenre, setSelectedGenre] = useState<string>(GenreEnumValue.TOUS);
    const [selectedTheme, setSelectedTheme] = useState<string>(ThemeEnumValue.TOUS);
    const [selectedEditeur, setSelectedEditeur] = useState<string>("Tous");
    const [selectedAges, setSelectedAges] = useState<Partial<Record<TypeArticleEnum, string>>>({});
    const selectedAge = selectedAges[isActive] ?? AgeEnumValue.TOUS;

    function setSelectedAge(value: string) {
        setSelectedAges((prev) => ({ ...prev, [isActive]: value }));
    }

    const isActiveName = typeArticleCollection.items.find((v) => v.label === isActive)?.value;

    const { data: articles = []} = useQuery({
        queryKey: QueryKeys.articles.byArticle(isActive),
        queryFn: () => getArticles(isActive)
    });

    const { data: editeurs = [] } = useQuery({
        queryKey: QueryKeys.marques.editeur(),
        queryFn: () => getEditeur()
    });

    const filteredArticles = useMemo(() => {
        let filteredArticles = articles;

        if (isActive === TypeArticleEnumValue.PELUCHE) {

            if (selectedMarque !== "Toutes") {
                return filteredArticles.filter((a) => a.marque === selectedMarque);
            }
            return filteredArticles;
        }

        if (selectedAge !== AgeEnumValue.TOUS) {
            filteredArticles = filteredArticles.filter((a) => IsInAge(a.age, a.typeAge, selectedAge as AgeEnum));
        }

        if (isActive === TypeArticleEnumValue.DEGUISEMENT) {
            if (selectedGenre !== GenreEnumValue.TOUS) {
                filteredArticles = filteredArticles.filter((a) => a.genre === selectedGenre);
            }
            if (selectedTheme !== ThemeEnumValue.TOUS) {
                filteredArticles = filteredArticles.filter((a) => a.theme === selectedTheme);
            }
            return filteredArticles;
        }

        if (isActive === TypeArticleEnumValue.LIVRE) {
            if (selectedEditeur !== "Tous") {
                return filteredArticles.filter((a) => a.marque === selectedEditeur); 
            }
            return filteredArticles;
        }

        return filteredArticles;
    },
        [articles, isActive, selectedMarque, selectedGenre, selectedTheme, selectedEditeur, selectedAge]
    );

    const marqueOptions = useMemo(() => {
    const marquesDisponibles = new Set(
        articles
        .map(a => a.marque)
        .filter((m): m is string => m !== undefined)
    )

    return (marques ?? []).flatMap(m =>
        m.marque !== undefined && marquesDisponibles.has(m.marque)
        ? [{ label: m.marque, value: m.marque }]
        : []
    )
    }, [filteredArticles, marques])

    const themesOptions = useMemo(() => {
    if (isActive !== TypeArticleEnumValue.DEGUISEMENT) return []

    const themesDisponibles = new Set(
        articles
        .map(a => a.theme)
        .filter((t): t is string => t !== undefined)
    )

    return ThemeEnumOption.filter(option => themesDisponibles.has(option.value))
    }, [isActive, filteredArticles])

    const editeurOptions = useMemo(() => {
    if (isActive !== TypeArticleEnumValue.LIVRE) return []

    const editeurDisponibles = new Set(
        articles
        .map(a => a.marque)
        .filter((t): t is string => t !== undefined)
    )

    return (editeurs ?? []).flatMap(editeur =>
         editeurDisponibles.has(editeur)
        ? [{ label: editeur, value: editeur }]
        : []
    )
    }, [filteredArticles, editeurs])

    function handleButton(nomArticle: NOMS_ARTICLES_TYPE) {
        setIsActive(nomArticle);
    }

    return (
        <>
            <h2
                className="text-xl text-center sm:text-3xl lg:text-4xl pt-12 lg:pt-[clamp(1rem,4vh,3rem)] pb-4 lg:pb-6"
                style={{ background: COLORS.background ,color: COLORS.primary,  fontFamily: "Fredoka" }}
            > 
                NOS ARTICLES
            </h2>  
            <div
                className="hidden md:flex flex-nowrap justify-center gap-x-[clamp(0.5rem,1.4vw,3rem)] px-4 pt-4 pb-2 mx-auto lg:max-w-[1550px]"
                style={{ background: COLORS.background, fontFamily: "Fredoka" }}
            >
                {typeArticleCollection.items.map((article) => {
                    const actif = article.label === isActive;
                    return (
                        <button
                            key={article.label}
                            onClick={() => handleButton(article.label)}
                            className="cursor-pointer pb-1 whitespace-nowrap text-[clamp(0.6rem,1.45vw,1.125rem)] uppercase tracking-wide transition-colors hover:opacity-80"
                            style={{
                                color: actif ? COLORS.boutonBordClique : COLORS.primary,
                                borderBottom: `3px solid ${actif ? COLORS.boutonBordClique : "transparent"}`,
                                fontWeight: actif ? 600 : 400,
                            }}
                        >
                            {article.value}
                        </button>
                    );
                })}
            </div>
            <div className="md:hidden flex justify-center p-4">
                <Select options={typeArticleCollection.items} selected={isActiveName ? isActiveName : ""} setSelected={(newActive: TypeArticleEnum) => handleButton(newActive)} title={"Type d'article"}/>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start items-center gap-4 mt-6 lg:mt-8 lg:text-lg">
            {isActive !== TypeArticleEnumValue.PELUCHE && 
                <Select options={AgeEnumOption} selected={selectedAge} setSelected={setSelectedAge} title="Tranche d'âge"/>
            }
            {(isActive===TypeArticleEnumValue.PELUCHE || isActive===TypeArticleEnumValue.BIJOUX || isActive===TypeArticleEnumValue.BAGAGERIE)
                && <Select options={marqueOptions} selected={selectedMarque} setSelected={setSelectedMarque} title="Marque"/> 
            }
            {isActive===TypeArticleEnumValue.LIVRE && 
                <Select options={[{ label: "Tous", value: "Tous" }, ...editeurOptions]} selected={selectedEditeur} setSelected={setSelectedEditeur} title="Éditeur"/> 
            }
            {isActive===TypeArticleEnumValue.DEGUISEMENT && 
                <>
                <Select options={GenreEnumOption} selected={selectedGenre} setSelected={setSelectedGenre} title="Genre"/> 
                <Select options={themesOptions} selected={selectedTheme} setSelected={setSelectedTheme} title="Theme"/> 
                </>

            }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 place-items-center p-4">
            {
                filteredArticles.map((item, index) => {
                    return (
                        <Article 
                            typeArticle={item.typeImage as TypeArticleEnum}
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