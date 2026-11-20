import z from "zod"
import { imageValidationSchema } from "./validation/ImageValidation"
import { Controller, useForm, useWatch } from "react-hook-form";
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
    setError,
    formState: {isSubmitting, errors}
  } = useForm<imageFormInputType, unknown, imageFormOutputType>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: { image: null}
  });

  const image = useWatch({ control, name: "image" });
  const hasImage = !!image;

  async function submitAndReset(image: {image: File}) {
    try {
      await onSubmit(image);
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
          {errors.root?.serverError && <span className="text-sm text-red-600" role="alert">{errors.root.serverError.message}</span>}
          <button 
          type="submit" disabled={isSubmitting}
          className="min-h-10 sm:min-h-12 px-4 py-2 rounded-xl text-xs sm:text-sm lg:text-base uppercase tracking-wide whitespace-normal text-center cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
              background: COLORS.boutonInterieurNonClique,
              color: COLORS.textDark,
              fontWeight: 400,
              border: `2px solid ${COLORS.boutonBordNonClique}`,
              fontFamily: "Fredoka",
          }}
          >{ hasImage ? "Validez en cliquant ici pour ajouter l'image" : "Ajouter une image à votre dossier"}</button>
      </form>
    </div>
  );
}