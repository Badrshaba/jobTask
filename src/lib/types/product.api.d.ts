declare type ProductsAPI = {
  message: string;
  success: boolean;
  page: number;
  limit: number;
  total: number;
  products: Product[];
};
declare type ProductAPI = {
  message: string;
  success: boolean;
  product: Product;
};
