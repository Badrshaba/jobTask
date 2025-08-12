'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { revalidateTag } from 'next/cache';

export async function DeleteProductById(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: JSON_HEADER,
  });

  const payload: { message: string; success: boolean } = await response.json();

  revalidateTag('product');

  return payload;
}
