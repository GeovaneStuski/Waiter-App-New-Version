import { Field } from '@/components/field';
import { cn } from '@/lib/utils';
import { CategoriesRepository } from '@/repositories/categories-repository';
import { queryKeys } from '@/utils/query-keys';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';

export function ProductModalCategories() {
  const { watch } = useFormContext();

  const haveSelectedCategory = watch('product.category');

  const { data: categories } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: async () => CategoriesRepository.list(),
  });
  
  const selectedCategory = useMemo(() => {
    return categories?.find(category => category._id == watch('product.category'));
  }, [watch('product.category'), categories]);
  return (
    <Field.Root className={cn('space-y-1.5', haveSelectedCategory && 'flex justify-between items-center flex-row')} name='product.category'>
      <Field.Label>Categoria</Field.Label>

      <Field.Main controller>
        {({ field: { onChange, value } }) => (
          !haveSelectedCategory ? (
            <div className='grid grid-cols-3 max-h-[80px] overflow-y-auto h-full gap-2.5'>
              {categories?.map(category => (
                <button onClick={() => onChange(category._id)} data-selected={category._id === value} className='border text-sm data-[selected=true]:border-red-500 rounded-full space-x-1 px-4 py-2.5 flex justify-center border-zinc-200' key={category._id}>
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <button onClick={() => onChange('')} className='border w-fit text-sm data-[selected=true]:border-red-500 rounded-full space-x-1 px-4 py-2.5 flex justify-center border-zinc-200'>
              <span>{selectedCategory?.icon}</span>
              <span>{selectedCategory?.name}</span>
              <span className='font-semibold text-red-500'>Alterar</span>
            </button>
          )
        )}
      </Field.Main>
    </Field.Root>
  );
}