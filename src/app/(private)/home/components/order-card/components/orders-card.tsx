import { Order } from "@/@types/entities/order";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImageByPath } from "@/utils/get-image-by-path";
import { priceFormatter } from "@/utils/price-formatter";

type Props = {
  order: Order;
  status: {
    title: string;
    icon: string;
  };
};

export function OrdersCard({ order, status }: Props) {
  const totalPrice = order.products.reduce(
    (acc, product) => acc + product.product.price * product.quantity,
    0,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="zinc-200 flex h-32 w-full flex-col items-center justify-center rounded-lg border bg-white">
          <span className="text-base font-medium">Mesa {order.table}</span>
          <span className="text-sm text-gray-400">
            {order.products.length} itens
          </span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Mesa {order.table}</DialogTitle>
        </DialogHeader>

        <DialogDescription className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Status do pedido</span>

          <span className="text-base font-bold text-black">
            {status.icon} {status.title}
          </span>
        </DialogDescription>

        <div className="space-y-4">
          <span className="text-sm font-medium text-zinc-500">Itens</span>

          {order.products.map(({ _id, product, quantity }) => (
            <div className="flex items-center gap-3" key={_id}>
              <img
                className="h-10 w-12 rounded-lg object-cover"
                src={getImageByPath(product.imagePath)}
                alt="product-image"
              />

              <div className="flex items-start gap-3">
                <span className="text-sm text-gray-400">{quantity}x</span>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-800">
                    {product.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {priceFormatter(product.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-500">Total</span>
            <span className="text-base font-semibold">
              {priceFormatter(totalPrice)}
            </span>
          </div>
        </div>

        <DialogFooter className="flex w-full !justify-between">
          <Button variant="destructive">Cancelar Pedido</Button>
          <Button className="px-14">Concluir Pedido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
