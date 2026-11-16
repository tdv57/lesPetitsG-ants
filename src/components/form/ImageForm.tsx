import z from "zod"
import { imageValidationSchema } from "./validation/ImageValidation"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type ImageListeFormProps = {
    onSubmit: (image: {image: File}) => void
}

const imageFormSchema = z.object({
    image: imageValidationSchema
});

type imageFormInputType = z.input<typeof imageFormSchema>;
type imageFormOutputType = z.output<typeof imageFormSchema>;

export function ImageForm({onSubmit}: ImageListeFormProps) {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting}
  } = useForm<imageFormInputType, unknown, imageFormOutputType>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: { image: null}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="image">Votre image</label>
        <Controller
            control={control}
            name="image"
            render={({ field: { onChange, ref }, fieldState }) => (
            <>
                <input
                ref={ref}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                />
                {fieldState.error && <span>{fieldState.error.message}</span>}
            </>
            )}
        />
      {errors.image && <span>{errors.image.message}</span>}
      <button type="submit" disabled={isSubmitting}>Valider</button>
    </form>
  );
}