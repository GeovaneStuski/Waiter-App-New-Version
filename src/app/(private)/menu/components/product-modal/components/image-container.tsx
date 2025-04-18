import { Field } from '@/components/field';
import { DialogTitle } from '@/components/ui/dialog';
import { getImageByPath } from '@/utils/get-image-by-path';
import { ImageIcon, MountainSnowIcon } from 'lucide-react';

type Props = {
  isLoading: boolean;
}

export function ProductModalImageContainer({ isLoading }: Props) {
  return (
    <div>
      <DialogTitle className="text-lg font-semibold text-gray-500">Image</DialogTitle>

      <Field.Root name='product.image'>
        <Field.Main controller>
          {({ field: { value, onChange } }) => (
            <div className='border rounded-xl overflow-hidden mt-4'>
              <div className='h-44 flex justify-center items-center bg-zinc-50'>
                {!isLoading ? (
                  value ? <img className='h-full object-cover w-full' src={typeof value === 'string' ? getImageByPath(value) : URL.createObjectURL(value)} /> : <MountainSnowIcon className='text-zinc-400 size-6'/>
                ) : (
                  <span>Carregando...</span>
                )}
              </div>
              <label className='bg-white font-semibold text-red-500 border-t h-14 justify-center cursor-pointer hover:bg-zinc-100 duration-300 transition-colors flex gap-2 items-center'>
                <ImageIcon className='size-6'/>
                <span className='text-base'>Alterar Imagem</span>
                <input onChange={(e) => onChange(e.target.files && e.target.files[0])} type='file' className='sr-only'/>
              </label>
            </div>
          )}
        </Field.Main>
      </Field.Root>
    </div>
  );
}