import { JEUX_DE_SOCIETE } from "../variables/jeuxDeSociete";
import {JOUETS} from "../variables/jouets";
import { PELUCHE } from "../variables/peluche";

export function getJouets() {
    return JOUETS;
}

export function getPeluches() {
    return PELUCHE;
}

export function getJeuxDeSociete() {
    return JEUX_DE_SOCIETE;
}

export const NOMS_ARTICLES : NOMS_ARTICLES_TYPE[] = ["JOUETS", "PELUCHES", "JEUX DE SOCIETE"];
export type NOMS_ARTICLES_TYPE = "JOUETS" | "PELUCHES" | "JEUX DE SOCIETE";
export const ArticleFunctionMapping = {
    "JOUETS": getJouets,
    "PELUCHES": getPeluches,
    "JEUX DE SOCIETE": getJeuxDeSociete
};