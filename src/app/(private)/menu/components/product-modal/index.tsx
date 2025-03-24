'use client';

import { Product } from '@/@types/product';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductModalImageContainer } from './components/image-container';
import { ProductModalIngredients } from './components/ingredients';
import { useQuery } from 'react-query';
import { IngredientsRepository } from '@/repositories/ingredients-repository';
import { queryKeys } from '@/utils/query-keys';
import { useProductModal } from './use-product-modal';
import { FormProvider } from 'react-hook-form';

type Props = {
  buttonLabel: string | LucideIcon; 
  product?: Product;
}

export function ProductModal({ buttonLabel: ButtonLabel, product }: Props) {
  const { form } = useProductModal(product);

  const { data: ingredients } = useQuery({
    queryKey: queryKeys.ingredients(),
    queryFn: async () => IngredientsRepository.list(),
  });

  const Trigger = typeof ButtonLabel === 'string' ? ButtonLabel : <ButtonLabel className="size-5 text-zinc-500"/>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' className="text-sm">{Trigger}</Button>
      </DialogTrigger>

      <DialogContent size="large">
        <DialogHeader onClose={() => form.reset()}>
          <DialogTitle className="text-2xl font-semibold">{product ? 'Editar' : 'Novo'} Produto</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form className='h-[680px] w-full flex gap-4'>
            <div className='w-full'>
              <ProductModalImageContainer isLoading={false}/>
            </div>

            <ProductModalIngredients ingredients={ingredients}/>
          </form>
        </FormProvider>

        <DialogFooter>
          <Button>{product ? 'Editar' : 'Novo'} Produto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}