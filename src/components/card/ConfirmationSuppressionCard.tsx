import { COLORS } from "../../variables/couleur";

type ConfirmationSuppressionCard = {
    onDelete: () => void;
}

export function ConfirmationSuppressionCard({ onDelete }: ConfirmationSuppressionCard) {
    return (
        <button 
            onClick={onDelete}
            className="w-full h-10 md:h-20 text-xs rounded-xl flex items-center justify-center lg:text-lg"
            style={{
            background: COLORS.boutonInterieurNonClique,
            border: `2px solid ${ COLORS.boutonBordNonClique }`,
            fontFamily: "Fredoka",
            }}
        > Confirmez la suppression ?  
        </button>
    )
}