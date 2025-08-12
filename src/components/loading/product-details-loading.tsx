import Square from '../skeletons/square';

export default function ProductDetailsLoading() {
  return (
    <div className='grid grid-cols-2 gap-2 my-10 lg:my-0  w-9/12'>
      <Square className='col-span-2 lg:col-span-1 h-96' />
      <div className='col-span-2 lg:col-span-1 flex flex-col space-y-4 justify-center '>
        <Square className='h-12' />
        <Square className='h-12' />
        <Square className='h-12' />
        <Square className='h-12' />
        <Square className='h-12' />
        <Square className='h-12' />
      </div>
    </div>
  );
}
