import z from "zod"
import { imageValidationSchema } from "./validation/ImageValidation"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { COLORS } from "../../variables/couleur";
import { ImageDropzoneCard } from "../card/ImageDropzoneCard";

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
    reset,
    formState: {errors, isSubmitting}
  } = useForm<imageFormInputType, unknown, imageFormOutputType>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: { image: null}
  });

  function submitAndReset(image: {image: File}) {
    onSubmit(image);
    reset();
  }
  return (
    <div className="flex flex-nowrap justify-center gap-x-[clamp(0.5rem,1.4vw,3rem)] px-4 pt-4 pb-2 mx-auto w-full lg:max-w-[1550px]">
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit(submitAndReset)} noValidate>
            <Controller
              control={control}
              name="image"
              render={({ field: { value, onChange }, fieldState }) => (
                <ImageDropzoneCard
                  value={value ?? null}
                  onChange={onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
        {errors.image && <span className="text-sm text-red-600" role="alert">{errors.image.message}</span>}
          <button 
          type="submit" disabled={isSubmitting}
          className="cursor-pointer pb-1 whitespace-nowrap text-[clamp(0.6rem,1.45vw,1.125rem)] uppercase tracking-wide transition-colors hover:opacity-80"
          style={{
              color: COLORS.textDark,
              fontWeight: 400,
              border: `2px solid ${COLORS.boutonBordNonClique}`,
              fontFamily: "Fredoka",
          }}
          >Ajouter une image à votre dossier</button>
      </form>
    </div>
  );
}