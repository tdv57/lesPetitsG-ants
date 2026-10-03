export const ThemeEnumValue = {
    POLICIER: 'POLICIER',
    POMPIER: 'POMPIER',
    MEDIEVAL: 'MEDIEVAL',
    FANTASTIQUE: 'FANTASTIQUE',
    TOUS: 'TOUS'
} as const;

export type ThemeEnum = (typeof ThemeEnumValue)[keyof typeof ThemeEnumValue];

export const ThemeEnumOption = Object.values(ThemeEnumValue).map((theme) => ({
    label: theme,
    value: theme,
}));