import { COLORS } from "../../variables/couleur";

type ConfirmationSuppressionCard = {
    onDelete: () => void;
    error?: string;
}

export function ConfirmationSuppressionCard({ onDelete, error }: ConfirmationSuppressionCard) {
    return (
        <>
            <button 
                onClick={onDelete}
                className="w-[calc(100%-2.5rem)] max-w-sm min-h-12 my-5 mx-auto px-4 py-2 text-sm rounded-xl flex items-center justify-center text-center cursor-pointer transition-opacity hover:opacity-80 lg:text-base"
                style={{
                background: COLORS.boutonInterieurNonClique,
                border: `2px solid ${ COLORS.boutonBordNonClique }`,
                fontFamily: "Fredoka",
                }}
            > Cliquez pour confirmer la suppression
            </button>
            {error && (
            <p className="text-center text-sm text-red-600" role="alert">
                {error}
            </p>
            )}
        </>
    )
}