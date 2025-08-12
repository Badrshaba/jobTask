export interface CreateProductDTO {
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export interface UpdateProductDTO {
  title?: string;
  price?: string;
  description?: string;
  image?: string;
  category?: string;
}
