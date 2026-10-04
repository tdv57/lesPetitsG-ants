import type { TypeAgeEnum } from "../enum/TypeAgeEnum";


export function mapAge(age: number | undefined , typeAge: TypeAgeEnum | undefined) : string {
    if( !age || age < 0 || !typeAge || (typeAge !== "ANS" && typeAge !== "MOIS")) {
        return "";
    }
    if (typeAge === "ANS") {
        if (age === 1 || age === 0) {
            return "Dès " + age + " an";
        } else {
            return "Dès " + age + " ans";
        }
    }
    else if (typeAge === "MOIS") {
        return "Dès " + age + " mois";
    }
    return ""; 
}