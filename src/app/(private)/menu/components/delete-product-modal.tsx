import { Product } from '@/@types/product';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ProductsRepository } from '@/repositories/products-repository';
import { priceFormatter } from '@/utils/price-formatter';
import { Trash2Icon } from 'lucide-react';

type Props = {
  product: Product;
}

export function DeleteProductModal({ product }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2Icon className="size-5 text-red-500" />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Produto</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-6 text-center">
          <span className="text-base font-medium">Tem certeza que deseja excluir o produto?</span>

          <div className="flex items-center border border-zinc-200 rounded-xl mx-8 overflow-hidden">
            <img className="object-cover w-40 h-32" src="https://www.minhareceita.com.br/app/uploads/2022/12/Dpizza-de-pepperoni-caseira-portal-minha-receita.jpg" alt="product-page" />
            <div className="flex flex-col text-base font-medium p-4 justify-between gap-2.5 text-start">
              <span>{product.category.icon} {product.category.name}</span>
              <span className="font-semibold">{product.name}</span>
              <span>{priceFormatter(product.price)}</span>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="w-full flex !justify-between items-center">
          <AlertDialogCancel>Manter Produto</AlertDialogCancel>
          <AlertDialogAction onClick={() => ProductsRepository.delete(product._id)}>Excluir Produto</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}