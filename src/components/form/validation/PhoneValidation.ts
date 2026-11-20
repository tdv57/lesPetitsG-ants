import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import { z } from "zod";

function normalizePhone(raw: string): string | null {
  const phone = parsePhoneNumberFromString(raw, "FR");
  if (!phone?.isValid() || phone.country !== "FR") return null;
  return phone.number; 
}

export const phoneValidationSchema = z.string().trim().transform((val, ctx) => {
  const normalized = normalizePhone(val);
  if (!normalized) {
    ctx.addIssue({ code: "custom", message: "Numéro de téléphone invalide"});
    return z.NEVER;
  }
  return normalized;
});
