'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/store';
import { DeleteProductById } from '@/lib/apis/delete-product-by-id';

interface ProductCardProps {
  product: Product;
  deleteBtn?: boolean;
  updateBtn?: boolean;
}

export default function ProductCard({ product: { _id, title, description, price, image, category }, deleteBtn = false, updateBtn = false }: ProductCardProps) {
  const { add, remove } = useCart();
  // Navigation
  const router = useRouter();

  // delete product
  const DeleteProduct = async (id: string) => {
    const response = await DeleteProductById(id);
    if (response.success) {
      remove(id);
    }
  };
  return (
    <Card className='min-w-[17rem] max-w-sm  hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white'>
      <CardHeader className='p-0 relative'>
        <div className='relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-50 to-gray-100'>
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className='w-full h-50 object-cover group-hover:scale-110 transition-transform duration-500'
          />
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300' />
        </div>
      </CardHeader>

      <CardContent className='p-2 space-y-1'>
        <div className='space-y-3'>
          <h3 className='font-bold text-xl leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300'>{title.toUpperCase()}</h3>
          <p className='text-muted-foreground line-clamp-2 leading-relaxed text-sm'>{description.slice(0, 40) + '...'}</p>
        </div>

        <div className='flex items-baseline gap-3'>
          <span className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>${price.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className='p-3 pt-0 flex gap-3'>
        <Button
          className={`${
            deleteBtn ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 '
          } flex-1 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 `}
          onClick={
            deleteBtn
              ? () => DeleteProduct(_id)
              : () =>
                  add({
                    _id,
                    title,
                    description,
                    price,
                    image,
                    category,
                  })
          }
          size='lg'>
          {!deleteBtn && <ShoppingCart className='w-4 h-4 mr-2' />}
          {deleteBtn ? 'Delete' : 'Add to Cart'}
        </Button>
        <Button
          variant='outline'
          size='lg'
          className={`px-6 border-2 cursor-pointer transition-all duration-300 ${updateBtn ? ' bg-yellow-400 hover:bg-yellow-500' : 'bg-transparent hover:bg-gray-50'}`}
          onClick={updateBtn ? () => router.push(`admin/updateproduct/${_id}`) : () => router.push(`/product/${_id}`)}>
          {updateBtn ? 'Update' : 'Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}
