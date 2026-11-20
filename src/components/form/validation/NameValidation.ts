import z from "zod";

export const nameValidationSchema = z.string()
    .max(200, { error: "Le nom ne peut pas faire plus de 200 caractères"})
    .min(1, { error: "Le nom ne peut pas être vide"});


