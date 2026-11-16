import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameValidationSchema } from "./validation/NameValidation";
import { zodResolver } from "@hookform/resolvers/zod";

type DossierFormPropsType = {
    onSubmit: (dossierData: {name: string}) => void;
}

const dossierFormSchema = z.object({
  name: nameValidationSchema
});

type dossierFormType = z.infer<typeof dossierFormSchema>;

export default function DossierForm({ onSubmit }: DossierFormPropsType) {
  
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<dossierFormType>({
    resolver: zodResolver(dossierFormSchema),
    defaultValues: { name: ''}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="name">Nom du dossier</label>
      <input
        type="tel"
        id="name"
        { ...register('name')}
      />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit" disabled={isSubmitting}>Valider</button>
    </form>
  );
}
