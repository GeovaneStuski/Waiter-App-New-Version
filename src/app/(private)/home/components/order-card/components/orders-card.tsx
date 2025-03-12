import { Order } from "@/@types/order";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { priceFormatter } from "@/utils/price-formatter";

type Props = {
  order: Order;
  status: {
    title: string;
    icon: string;
  }
}

export function OrdersCard({ order, status }: Props) {
  const totalPrice = order.products.reduce((acc, product) => acc + (product.product.price * product.quantity), 0)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full h-32 flex-col bg-white flex justify-center items-center border zinc-200 rounded-lg">
          <span className="text-base font-medium">Mesa {order.table}</span>
          <span className="text-sm text-gray-400">{order.products.length} itens</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Mesa {order.table}</DialogTitle>
        </DialogHeader>

        <DialogDescription className="flex flex-col gap-2">
          <span className="font-semibold text-sm">Status do pedido</span>

          <span className="font-bold text-black text-base">{status.icon} {status.title}</span>
        </DialogDescription>


        <div className="space-y-4">
          <span className="text-sm text-zinc-500 font-medium">Itens</span>

          {order.products.map(({ _id, product, quantity }) => (
            <div className="flex gap-3 items-center" key={_id}>
              <img className="w-12 h-10 object-cover rounded-lg" src="https://www.minhareceita.com.br/app/uploads/2022/12/Dpizza-de-pepperoni-caseira-portal-minha-receita.jpg" alt="product-image" />

              <div className="flex gap-3 items-start">
                <span className="text-sm text-gray-400">{quantity}x</span>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold text-base">{product.name}</span>
                  <span className="text-gray-500 text-sm">{priceFormatter(product.price)}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center">
            <span className="font-medium text-sm text-zinc-500">Total</span>
            <span className="text-base font-semibold">{priceFormatter(totalPrice)}</span>
          </div>
        </div>

        <DialogFooter className="flex !justify-between w-full">
          <Button variant='destructive'>Cancelar Pedido</Button>
          <Button className="px-14">Concluir Pedido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}