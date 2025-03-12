import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  buttonLabel: string;
}

export function ProductModal({ buttonLabel }: Props) {
  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button variant='destructive' className="text-sm">Novo Produto</Button>
          </DialogTrigger>

          <DialogContent size="large">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Novo Produto</DialogTitle>
            </DialogHeader>

            <div className="flex w-full h-[680px] gap-8">
              <div className="w-full h-full">
                <DialogTitle className="text-lg font-semibold text-gray-500">Image</DialogTitle>
              </div>

              <div className="w-full h-full">
                <header className="flex justify-between items-center">
                  <DialogTitle className="text-lg font-semibold text-gray-500">Ingredientes</DialogTitle>

                  <Button variant='destructive' className="text-sm">Novo ingrediente</Button>
                </header>
              </div>
            </div>

            <DialogFooter>
              <Button>{buttonLabel}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}