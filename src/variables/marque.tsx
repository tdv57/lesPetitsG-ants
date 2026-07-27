import type { Marque } from "../components/card/MarqueCard";


export const MARQUES : Marque[] = Array.from({ length: 100 }, (_, i) =>
  [
    {
      id: i * 5 + 1,
      img: "/assets/A.jpeg",
      nom: "A",
    },
    {
      id: i * 5 + 2,
      img: "/assets/AG2R.jpeg",
      nom: "AG2R",
    },
    {
      id: i * 5 + 3,
      img: "/assets/king_jouet.png",
      nom: "KING JOUET",
    },
    {
      id: i * 5 + 4,
      img: "/assets/plusieurs_jouets.jpeg",
      nom: "UNKOWN",
    },
    {
      id: i * 5 + 5,
      img: "/assets/moulin_roty.png",
      nom: "MOULIN ROTY",
    },

  ]
).flat();