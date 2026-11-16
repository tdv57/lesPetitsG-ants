import { z } from "zod"

export const imageValidationSchema = z  .instanceof(File, { message: "Fichier requis" })
    .refine((f) => f.size > 0, "Le fichier ne peut pas être vide")
    .refine((f) => f.size <= 10*1_024*1_024, "Fichier trop gros (10 Mo maximum)")
    .refine(
        (f) => ["image/png", "image/jpeg", "image/webp"].includes(f.type),
        "L'image doit être au format png, jpeg ou webp"
    ).nullable()
    .transform((file, ctx) => {
        if (file === null) {
        ctx.addIssue({ code: "custom", message: "Fichier requis" });
        return z.NEVER;
        }
        return file;
    });