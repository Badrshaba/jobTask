import ProductCard from '@/components/card';
import ProductCardLoading from '@/components/loading/product-card-loading';
import PaginationComponent from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/apis/get-all-products.api';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Admin({ searchParams }: { searchParams: Promise<{ page: string; limit: string }> }) {
  const { page, limit } = await searchParams;

  const { products, total } = await getProducts({ page, limit });
  return (
    <main className='flex justify-center flex-wrap gap-5 w-10/12 mx-auto my-10'>
      <div className=' text-end w-full '>
        <Link href='/admin/addproduct'>
          <Button className=' cursor-pointer bg-gradient-to-r from-green-600 to-green-700'>Add Product</Button>
        </Link>
      </div>
      {products.length === 0 && <h1 className='text-2xl font-bold text-center'>No products found</h1>}
      <Suspense fallback={<ProductCardLoading />}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            deleteBtn
            updateBtn
          />
        ))}
      </Suspense>

      <PaginationComponent
        page={+page || 1}
        limit={+limit || 10}
        total={total}
      />
    </main>
  );
}
