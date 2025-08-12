import { JSON_HEADER } from '@/lib/constants/api.constant';

export async function getProducts({ page = '1', limit = '10' }: { page?: string; limit?: string }) {
  const response = await fetch(`${process.env.API}/api/products?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: JSON_HEADER,
    next: { tags: ['product'] },
  });

  const payload: ProductsAPI = await response.json();

  return payload;
}
