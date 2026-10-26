import type { TypeMediaEnum } from "../enum/TypeMediaEnum"

export type AnnonceSelect = {
  id: number;
  code: string;
  url: string;
  mediaType: TypeMediaEnum;
  commentaire: string;
  redirectionLink?: string;
  createdAt: Date;
}