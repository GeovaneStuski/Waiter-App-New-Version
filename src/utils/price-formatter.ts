export function priceFormatter(price: number) {
  if (!price) return;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}
