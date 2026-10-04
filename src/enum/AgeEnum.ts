import { TypeAgeEnumValue, type TypeAgeEnum } from "./TypeAgeEnum";

export const AgeEnumValue = {
    zeroTroisAns : "0-2 ans",
    troisSixAns: "3-5 ans",
    sixHuitAns: "6-8 ans",
    neufPlusAns: "9+ ans",
    TOUS: "Tout âge"
} as const;

export type AgeEnum = (typeof AgeEnumValue)[keyof typeof AgeEnumValue];

export const AgeEnumOption = Object.values(AgeEnumValue).map(age => ({label: age, value: age}));
export function IsInAge(age: number | undefined , typeAge: TypeAgeEnum | undefined, ageEnumValue: AgeEnum) : boolean {
    if (age === undefined || typeAge === undefined) {
        return false;
    }
    switch(ageEnumValue) {
        case (AgeEnumValue.zeroTroisAns): return ((age >= 0 && age <= 2) || typeAge === TypeAgeEnumValue.MOIS);
        case (AgeEnumValue.troisSixAns): return (age >= 3 && age <= 5);
        case (AgeEnumValue.sixHuitAns): return (age >= 6 && age <= 8);
        case(AgeEnumValue.neufPlusAns): return (age >= 9);
    }
    return false;
}