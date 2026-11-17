import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { phoneValidationSchema} from "../form/validation/PhoneValidation";
import { COLORS } from "../../variables/couleur";

type ListeFormPropsType = {
    onSubmit: (userLogin: {phone: string}) => void;
}

const phoneFormSchema = z.object({
  phone: phoneValidationSchema,
});

type phoneFormType = z.infer<typeof phoneFormSchema>;

export default function ListeForm({ onSubmit }: ListeFormPropsType) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<phoneFormType>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {phone: ''}
  })

  function submitAndReset(userLogin: {phone: string}) {
    onSubmit(userLogin);
    reset();
  }

  return (
    <div className="flex flex-nowrap justify-center gap-x-[clamp(0.5rem,1.4vw,3rem)] px-4 pt-4 pb-2 mx-auto w-full lg:max-w-[1550px]">
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit(submitAndReset)} noValidate>
        <label htmlFor="name"
        className="mx-auto"
          style={{
              color:  COLORS.primary,
              fontWeight:  400,
              fontFamily: "Fredoka",
          }}>Rentrez votre numéro de téléphone</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          className="w-full appearance-none rounded-lg px-4 py-2 outline-none shadow-none focus:outline-none focus:ring-0"
          style={{
            backgroundColor: COLORS.boutonInterieurNonClique,
            color: COLORS.textDark,
            border: `2px solid ${COLORS.boutonBordNonClique}`,
            fontFamily: 'Fredoka',
          }}
          {...register("phone")}
        />
        {errors.phone && <span className="text-sm text-red-600" role="alert">{errors.phone.message}</span>}
        <button 
        type="submit" disabled={isSubmitting}
        className="cursor-pointer pb-1 whitespace-nowrap text-[clamp(0.6rem,1.45vw,1.125rem)] uppercase tracking-wide transition-colors hover:opacity-80"
        style={{
            color: COLORS.primary,
            fontWeight: 400,
            fontFamily: "Fredoka",
            border: `2px rounded-xl solid ${COLORS.boutonBordNonClique}`,
        }}>Valider</button>
      </form>
    </div>

  );
}

      