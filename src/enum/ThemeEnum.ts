export const ThemeEnumValue = {
    TOUS: 'TOUS',
    POLICIER: 'POLICIER',
    POMPIER: 'POMPIER',
    COSMONOTE: 'COSMONOTE',
    PILOTE: 'PILOTE',
    ANIMAUX: 'ANIMAUX',
    PIRATE: 'PIRATE',
    SIRENE: 'SIRENE',
    CAPE: 'CAPE',
    MEDIEVAL: 'MEDIEVAL',
    FANTASTIQUE: 'FANTASTIQUE'
} as const;

export type ThemeEnum = (typeof ThemeEnumValue)[keyof typeof ThemeEnumValue];

export const ThemeEnumOption = Object.values(ThemeEnumValue).map((theme) => ({
    label: theme,
    value: theme,
}));