import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { phoneValidationSchema} from "../form/validation/PhoneValidation";

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
    formState: { errors, isSubmitting },
  } = useForm<phoneFormType>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {phone: ''}
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="phone">Numéro de téléphone</label>
      <input
        type="tel"
        id="phone"
        placeholder="06 12 34 56 78"
        {...register("phone")}
      />
      {errors.phone && <span>{errors.phone.message}</span>}
      <button type="submit" disabled={isSubmitting}>Valider</button>
    </form>
  );
}

      