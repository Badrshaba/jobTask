'use client';

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export default function PaginationComponent({ page = 1, limit = 10, total = 1 }: { page: number; limit: number; total: number }) {
  return (
    <Pagination className='col-span-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={page == 1 ? 'text-gray-400 hover:text-gray-400' : ''}
            href={page == 1 ? '#' : `?page=${page - 1}&limit=${limit}`}
          />
        </PaginationItem>
        {Array.from({ length: Math.ceil(total / limit) }, (_, index) => index + 1).map((item, index) => (
          <PaginationItem key={item}>
            <PaginationLink
              className={page == index + 1 ? cn(buttonVariants({ variant: 'outline' })) : ''}
              href={`?page=${item}&limit=${limit}`}>
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className={total <= page * limit ? 'text-gray-400 hover:text-gray-400' : ''}
            href={total <= page * limit ? '#' : `?page=${page + 1}&limit=${limit}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
