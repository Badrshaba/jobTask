import FormUpdateProduct from './_components/form-update-product';
import { getProductForAdmin } from '@/lib/apis/get-product-by-id-for-admin';

export default async function UpdateProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { product } = await getProductForAdmin(id);
  return (
    <main className='flex justify-center flex-wrap gap-5 w-10/12 mx-auto my-10 '>
      <FormUpdateProduct product={product} />
    </main>
  );
}
