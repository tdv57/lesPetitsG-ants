import { mapToJeuDeSocieteSelect, mapToJouetSelect, mapToPelucheSelect } from "../mapper/ImageMapper";
import { getImageByType } from "./ImageService";

export async function getJouets() {
    return (await getImageByType("JOUET")).map((jouet) => mapToJouetSelect(jouet));
}

export async function getPeluches() {
    return (await getImageByType("PELUCHE")).map((peluche) => mapToPelucheSelect(peluche));
}

export async function getJeuDeSocietes() {
    return (await getImageByType("JEU DE SOCIETE")).map((jeuDeSociete) => mapToJeuDeSocieteSelect(jeuDeSociete));
}

export const NOMS_ARTICLES : NOMS_ARTICLES_TYPE[] = ["JOUET", "PELUCHE", "JEU DE SOCIETE"];
export type NOMS_ARTICLES_TYPE = "JOUET" | "PELUCHE" | "JEU DE SOCIETE";
export const ArticleFunctionMapping = {
    "JOUETS": getJouets,
    "PELUCHES": getPeluches,
    "JEU DE SOCIETE": getJeuDeSocietes
};