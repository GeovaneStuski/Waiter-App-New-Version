export type CreateOrUpdateProductPayload = {
  name: string;
  description: string;
  ingredients?: string[];
  category: string;
  price: string;
  image: string | Blob
}