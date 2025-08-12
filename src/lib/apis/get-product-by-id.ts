import { JSON_HEADER } from '@/lib/constants/api.constant';

export async function getProduct(id: string) {
  const response = await fetch(`${process.env.API}/api/products/${id}`, {
    method: 'GET',
    headers: JSON_HEADER,
    next: { revalidate: 3600 },
  });

  const payload: ProductAPI = await response.json();

  return payload;
}
