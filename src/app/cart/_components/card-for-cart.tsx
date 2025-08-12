import { Trash2 } from 'lucide-react';
import Image from 'next/image';

type Props = {
  product: Product & { quantity: number };
  increment: (product: Product) => void;
  decrement: (product: Product) => void;
  remove: (id: string) => void;
};

export default function CardForCart({ product, increment, decrement, remove }: Props) {
  return (
    <div className='flex justify-between my-5 shadow-sm p-2 rounded-lg items-center'>
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className='w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-500'
      />
      <p className='font-bold'>{product.title}</p>
      <p className=' text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>${product.price}</p>
      <span className='flex items-center gap-5 border rounded-lg py-2 px-4 '>
        <button
          className=' cursor-pointer  '
          onClick={() => increment(product)}>
          +
        </button>
        <p>{product.quantity}</p>
        <button
          disabled={product.quantity === 1}
          className=' cursor-pointer  '
          onClick={() => decrement(product)}>
          -
        </button>
      </span>
      <p className=' text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent '>${product.price * product.quantity}</p>
      <Trash2
        onClick={() => remove(product._id)}
        size={20}
        color='red'
        className='cursor-pointer mr-4'
      />
    </div>
  );
}
