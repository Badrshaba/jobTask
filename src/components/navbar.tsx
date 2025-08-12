'use client';
import { useCart } from '@/lib/store';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchComponent from './search-component';

export default function Navbar() {
  const cart = useCart((state) => state.cart);
  // Navigation
  const router = useRouter();
  return (
    <header className='flex justify-between w-10/12 mx-auto items-center p-4 sticky top-0 z-50 bg-white '>
      <Link
        href='/'
        className='text-3xl font-bold'>
        eCommerce
      </Link>

      <SearchComponent />

      <span className='flex items-center gap-5'>
        <Link href='/'>Home</Link>
        <Link href='/admin'>Admin</Link>
        <span
          onClick={() => router.push('/cart')}
          className='relative cursor-pointer'>
          <ShoppingBasket />
          <p className='absolute bottom-3 right-1 w-4 h-4 text-center text-xs text-white bg-red-500 rounded-full'>{cart.length}</p>
        </span>
      </span>
    </header>
  );
}
