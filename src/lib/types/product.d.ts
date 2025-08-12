declare type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

declare type CreateProduct = {
  title: string;
  description: string;
  image: string;
  category: string;
  price: string;
};
