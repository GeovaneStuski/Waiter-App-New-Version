import { Field } from "@/components/field";
import { DialogTitle } from "@/components/ui/dialog";
import { getImageByPath } from "@/utils/get-image-by-path";
import { ImageIcon, MountainSnowIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";

type Props = {
  isLoading: boolean;
};

export function ProductModalImageContainer({ isLoading }: Props) {
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = !!(errors?.product as any)?.image;

  return (
    <div>
      <DialogTitle className="text-lg font-semibold text-gray-500">
        Image
      </DialogTitle>

      <Field.Root name="product.image">
        <Field.Main controller>
          {({ field: { value, onChange } }) => (
            <div
              data-hasError={hasError}
              className="group mt-4 overflow-hidden rounded-xl border data-[hasError=true]:border-red-500"
            >
              <div className="flex h-44 items-center justify-center bg-zinc-50 group-data-[hasError=true]:bg-red-50">
                {!isLoading ? (
                  value ? (
                    <img
                      className="h-full w-full object-cover"
                      src={
                        typeof value === "string"
                          ? getImageByPath(value)
                          : URL.createObjectURL(value)
                      }
                    />
                  ) : (
                    <MountainSnowIcon className="size-6 text-zinc-400" />
                  )
                ) : (
                  <span>Carregando...</span>
                )}
              </div>
              <label className="flex h-14 cursor-pointer items-center justify-center gap-2 border-t bg-white font-semibold text-red-500 transition-colors duration-300 hover:bg-zinc-100 group-data-[hasError=true]:border-t-red-500 group-data-[hasError=true]:bg-red-100">
                <ImageIcon className="size-6" />
                <span className="text-base">Alterar Imagem</span>
                <input
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                  type="file"
                  className="sr-only"
                />
              </label>
            </div>
          )}
        </Field.Main>

        <Field.Error />
      </Field.Root>
    </div>
  );
}
