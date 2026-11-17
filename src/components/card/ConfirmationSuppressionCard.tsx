import { COLORS } from "../../variables/couleur";

type ConfirmationSuppressionCard = {
    onDelete: () => void;
}

export function ConfirmationSuppressionCard({ onDelete }: ConfirmationSuppressionCard) {
    return (
        <button 
            onClick={onDelete}
            className="w-80 h-80 m-5 mx-auto md:h-20 text-xs rounded-xl flex items-center justify-center lg:text-lg"
            style={{
            background: COLORS.boutonInterieurNonClique,
            border: `2px solid ${ COLORS.boutonBordNonClique }`,
            fontFamily: "Fredoka",
            }}
        > Cliquez pour confirmer la suppression
        </button>
    )
}