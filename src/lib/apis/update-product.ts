'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { revalidateTag } from 'next/cache';

export async function updateProduct(product: Product) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}`, {
    method: 'PUT',
    headers: JSON_HEADER,
    body: JSON.stringify(product),
  });

  const payload: ProductsAPI = await response.json();

  revalidateTag('product');

  return payload;
}
