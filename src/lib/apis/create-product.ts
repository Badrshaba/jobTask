'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { revalidateTag } from 'next/cache';

export async function createProduct(product: CreateProduct) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    method: 'POST',
    headers: JSON_HEADER,
    body: JSON.stringify(product),
  });

  const payload: ProductsAPI = await response.json();

  revalidateTag('product');

  return payload;
}
