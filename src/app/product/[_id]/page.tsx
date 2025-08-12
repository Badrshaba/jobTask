import { getProduct } from '@/lib/apis/get-product-by-id';
import Image from 'next/image';
import ActionProductDetails from './_components/action-product-details';
import { Suspense } from 'react';
import ProductDetailsLoading from '@/components/loading/product-details-loading';

export default async function ProductDetails({ params }: { params: Promise<{ _id: string }> }) {
  const { _id } = await params;
  const { product } = await getProduct(_id);

  return (
    <section className='flex  justify-center items-center gap-2  h-[90vh] '>
      <Suspense fallback={<ProductDetailsLoading />}>
        <div className='w-9/12 mx-auto border-2 min-h-[50%] my-10 lg:my-0 lg:h-[50vh] flex flex-col lg:flex-row justify-center items-center gap-2 '>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className='lg:w-6/12 w-full h-full  group-hover:scale-110 transition-transform duration-500'
          />
          <div className='lg:w-6/12 w-full flex flex-col space-y-2 justify-around gap-2'>
            <h2 className='text-2xl font-bold text-center'>{product.title}</h2>
            <hr />
            <p className='text-md font-medium text-center text-muted-foreground'>{product.description}</p>
            <div className='flex justify-evenly gap-2'>
              <div className='flex items-center justify-center gap-2'>
                <h3 className='text-lg font-bold text-center'>Price :</h3>
                <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>${product.price.toFixed(2)}</span>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <h3 className='text-lg font-bold text-center'>Category :</h3>
                <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>{product.category}</span>
              </div>
            </div>
            <ActionProductDetails product={product} />
          </div>
        </div>
      </Suspense>
    </section>
  );
}
