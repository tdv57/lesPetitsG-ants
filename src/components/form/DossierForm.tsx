import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameValidationSchema } from "./validation/NameValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { COLORS } from "../../variables/couleur";

type DossierFormPropsType = {
    onSubmit: (dossierData: {name: string}) => Promise<unknown>;
}

const dossierFormSchema = z.object({
  name: nameValidationSchema
});

type dossierFormType = z.infer<typeof dossierFormSchema>;

export default function DossierForm({ onSubmit }: DossierFormPropsType) {
  
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: {errors, isSubmitting}
  } = useForm<dossierFormType>({
    resolver: zodResolver(dossierFormSchema),
    defaultValues: { name: ''}
  });

  async function submitAndReset(dossierData: {name: string}) {
    try {
      await onSubmit(dossierData);
    } catch (e) {
      console.log("catch");
      setError('root.serverError', {
        message: e instanceof Error ? e.message : 'Une erreur est survenue',
      });
      return;
    }
    reset();
  }

  return (
    <div className="flex flex-nowrap justify-center gap-x-[clamp(0.5rem,1.4vw,3rem)] px-4 pt-4 pb-2 mx-auto w-full lg:max-w-[1550px]">
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit(submitAndReset)} noValidate>
        <label htmlFor="name"
          style={{
              color:  COLORS.primary,
              fontWeight:  400,
              fontFamily: "Fredoka",
          }}
        >Nom du dossier</label>
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
          {...register('name')}
        />
        {errors.name && <span className="text-sm text-red-600" role="alert">{errors.name.message}</span>}
        {errors.root?.serverError && <span className="text-sm text-red-600" role="alert">{errors.root.serverError.message}</span>}
        <button 
        type="submit" disabled={isSubmitting}
        className="cursor-pointer pb-1 whitespace-nowrap text-[clamp(0.6rem,1.45vw,1.125rem)] uppercase tracking-wide transition-colors hover:opacity-80"
        style={{
            color: COLORS.primary,
            fontWeight: 400,
            fontFamily: "Fredoka",
        }}
        >Valider</button>
      </form>
    </div>
  );
}
