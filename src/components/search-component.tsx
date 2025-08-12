'use client';

import { Input } from '@/components/ui/input';
import { JSON_HEADER } from '@/lib/constants/api.constant';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchComponent() {
  // Search input
  const [search, setSearch] = useState('');

  // Search result from api
  const [result, setResult] = useState<Product[]>([]);

  // Navigation
  const router = useRouter();

  // useDebouncedCallback for delay search
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearch(value);
    },
    // delay in ms
    200
  );

  // Call api
  const CallApi = async (search: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?search=${search}`, {
      method: 'GET',
      headers: JSON_HEADER,
    });

    const { products }: ProductsAPI = await response.json();
    setResult([...products]);
  };

  // useEffect to call api
  useEffect(() => {
    if (search) {
      CallApi(search);
    }
  }, [search]);
  return (
    <div className='w-1/2 relative hidden md:block'>
      {/* Search input */}
      <Input
        type='search'
        placeholder='Search...'
        value={search}
        onChange={(e) => debounced(e.target.value)}
      />

      {/* Search result */}
      <div className={`${search && result.length > 0 ? 'flex' : 'hidden'} flex-col space-y-2 absolute w-full bg-white transition-all duration-500 border rounded-lg p-4 z-10 `}>
        {result.map((product) => (
          <div
            key={product._id}
            onClick={() => router.push(`/product/${product._id}`)}
            className='flex items-center border-b py-2 justify-around hover:bg-slate-100 cursor-pointer gap-2'>
            <Image
              src={'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/wireless-headphones-LqpBeruF3f0RCUBwcARZlX0cQuiOyO.png'}
              alt={'product image'}
              width={300}
              height={300}
              className='w-10 h-10  rounded-full hover:scale-110 transition-transform duration-500'
            />
            <p className='font-bold'>{product.title}</p>
            <p className=' text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
