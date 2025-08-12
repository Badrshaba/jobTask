import { JSON_HEADER } from '@/lib/constants/api.constant';

export async function getProductForAdmin(id: string) {
  const response = await fetch(`${process.env.API}/api/products/${id}`, {
    method: 'GET',
    headers: JSON_HEADER,
  });

  const payload: ProductAPI = await response.json();

  return payload;
}
