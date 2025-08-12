import Image from 'next/image';

export default function EmptyCart() {
  return (
    <Image
      src={'/Images/empty-cart.png'}
      alt={'test'}
      width={300}
      height={300}
      className='col-span-6 '
    />
  );
}
