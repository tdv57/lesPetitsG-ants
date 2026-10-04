export const TypeAgeEnumValue = {
    ANS: "ANS",
    MOIS: "MOIS"
}

export type TypeAgeEnum = (typeof TypeAgeEnumValue)[keyof typeof TypeAgeEnumValue];

export const TypeAgeOption = Object.values(TypeAgeEnumValue).map(age => ({ label: age, value: age }));