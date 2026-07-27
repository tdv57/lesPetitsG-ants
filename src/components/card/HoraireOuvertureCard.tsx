import { COLORS } from "../../variables/couleur";

export default function HoraireOuvertureCard() {
    const horaires = [
        { jour: 'Lundi', horairesMatin: 'Fermé', horairesAprem: 'Fermé' },
        { jour: 'Mardi', horairesMatin: '9h - 12h', horairesAprem: '14h - 19h' },
        { jour: 'Mercredi', horairesMatin: '9h - 12h', horairesAprem: '14h - 19h' },
        { jour: 'Jeudi', horairesMatin: '9h - 12h', horairesAprem: '14h - 19h' },
        { jour: 'Vendredi', horairesMatin: '9h - 12h', horairesAprem: '14h - 19h' },
        { jour: 'Samedi', horairesMatin: '9h - 12h', horairesAprem: '14h - 19h' },
        { jour: 'Dimanche', horairesMatin: 'Fermé', horairesAprem: 'Fermé' },
    ]

    return (
        <>
            <h2 className="text-sm whitespace-nowrap sm:text-2xl font-bold mb-6" style={{ color: COLORS.primary }}>Nos Horaires d'ouverture :</h2>
            <table style={{ backgroundColor: COLORS.backgroundCard }} className={`w-full text-sm md:text-lg max-w-md mx-auto text-center`}>
                <tr style={{ color: COLORS.textDark }}>
                    <th style={{ borderColor: COLORS.test }} className=" border-separate border-2 " >Jour</th>
                    <th style={{ borderColor: COLORS.test }} className=" border-separate border-2 ">Matin</th>
                    <th style={{ borderColor: COLORS.test }} className=" border-separate border-2 ">Après-midi</th>
                </tr>
                {horaires.map((horaire, index) => (
                    <tr className="" style={{ color: COLORS.textDark }} key={`${index}-${horaire.jour}`}>
                        <td style={{ borderColor: COLORS.test }} className="border-separate border-2">{horaire.jour}</td>
                        <td style={{ borderColor: COLORS.test }} className=" border-separate border-2 ">{horaire.horairesMatin}</td>
                        <td style={{ borderColor: COLORS.test }} className=" border-separate border-2 ">{horaire.horairesAprem}</td>
                    </tr>
                ))}
            </table>
        </>
    )
}