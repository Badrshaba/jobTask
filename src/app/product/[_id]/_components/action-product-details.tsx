'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';

export default function ActionProductDetails({ product }: { product: Product }) {
  const { add, increment, decrement, cart } = useCart();
  return (
    <>
      <div className='flex items-center justify-center gap-2'>
        <Button onClick={() => increment(product)}>+</Button>
        <span className='px-2'>{cart.find((p) => p._id === product._id)?.quantity || 1}</span>
        <Button onClick={() => decrement(product)}>-</Button>
      </div>
      <Button
        className=' cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300  '
        onClick={() => add(product)}
        size='lg'>
        <ShoppingCart className='w-4 h-4 mr-2' />
        Add to Cart
      </Button>
    </>
  );
}
