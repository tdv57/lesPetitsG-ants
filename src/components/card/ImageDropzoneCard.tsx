import { useDropzone } from 'react-dropzone';
import { COLORS } from '../../variables/couleur';

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function ImageDropzoneCard({ value, onChange, error }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/webp': [],
    },
    maxFiles: 1,
    onDrop: (accepted, rejected) => {
      const file = accepted[0] ?? rejected[0]?.file ?? null;
      if (file) onChange(file);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:opacity-80"
        style={{
          backgroundColor: isDragActive
            ? COLORS.boutonInterieurNonClique
            : 'transparent',
          borderColor: error ? '#dc2626' : COLORS.boutonBordNonClique,
          color: COLORS.textDark,
          fontFamily: 'Fredoka',
        }}
      >
        <input {...getInputProps()} />

        <p>
          Vous pouvez cliquer ou faire glisser une image pour sélectionner une
          image
        </p>

        {value && (
          <p className="text-sm opacity-70">
            Voici l'image actuellement sélectionnée : {value.name} (
            {formatSize(value.size)})
          </p>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}