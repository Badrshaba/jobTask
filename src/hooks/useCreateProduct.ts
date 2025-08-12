'use client';

import { createProduct } from '@/lib/apis/create-product';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useCreateProduct() {
  // Navigation
  const router = useRouter();
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: CreateProduct) => {
      const payload = await createProduct(fields);
      return payload;
    },

    // Success message toast
    onSuccess: () => {
      // Show toast success message
      toast.success('Product created successfully');
      // Redirect to products page
      router.push('/admin');
    },

    // Error message toast
    onError: (err: Error) => {
      toast.error(err.message || 'Something Went Wrong');
    },
  });

  return { isPending, error, createProduct: mutate };
}
