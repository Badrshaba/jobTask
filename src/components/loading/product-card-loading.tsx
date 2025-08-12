import Square from '../skeletons/square';

export default function ProductCardLoading() {
  return (
    <div className='grid grid-cols-6 gap-10 md:gap-5 my-10 lg:my-0  w-9/12'>
      <div className='md:col-span-2 col-span-6 flex flex-col space-y-4 justify-center '>
        <Square className='h-50' />
        <Square className='h-12' />
        <Square className='h-12' />
      </div>
      <div className=' md:col-span-2 col-span-6 flex flex-col space-y-4 justify-center '>
        <Square className='h-50' />
        <Square className='h-12' />
        <Square className='h-12' />
      </div>
      <div className='md:col-span-2 col-span-6 flex flex-col space-y-4 justify-center '>
        <Square className='h-50' />
        <Square className='h-12' />
        <Square className='h-12' />
      </div>
    </div>
  );
}
