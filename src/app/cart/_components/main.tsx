'use client';
import { useCart } from '@/lib/store';
import CardForCart from './card-for-cart';
import EmptyCart from './empty-cart';
import { Button } from '@/components/ui/button';

export default function Main() {
  const { cart, increment, decrement, removeAll, remove } = useCart();
  const SumTotal = () => {
    const total = cart.map((product) => product.price * product.quantity);
    const final = total.reduce((a, b) => a + b, 0);
    return final;
  };
  return (
    <section className='w-10/12 mx-auto grid grid-cols-6 justify-items-center items-start gap-2'>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className='col-span-6 w-full min-w-[300px] overflow-x-auto lg:col-span-4 '>
            {cart.map((product, index) => (
              <CardForCart
                product={product}
                increment={increment}
                decrement={decrement}
                remove={remove}
                key={index}
              />
            ))}
          </div>
          <div className='col-span-6 lg:col-span-2 w-10/12 mt-10 border-1 border-muted-foreground rounded-xl p-5  flex flex-col space-y-4 justify-center '>
            <p className='text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>${SumTotal().toFixed(2)}</p>

            <Button
              onClick={() => removeAll()}
              className=' cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-xl '>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
