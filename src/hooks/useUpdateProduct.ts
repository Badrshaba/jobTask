'use client';

import { updateProduct } from '@/lib/apis/update-product';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function useUpdateProduct() {
  // Navigation
  const router = useRouter();
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: Product) => {
      const payload = await updateProduct(fields);
      return payload;
    },

    // Success message toast
    onSuccess: () => {
      // Show toast success message
      toast.success('Product updated successfully');
      // Redirect to products page
      router.push('/admin');
    },

    // Error message toast
    onError: (err: Error) => {
      toast.error(err.message || 'Something Went Wrong');
    },
  });

  return { isPending, error, updateProduct: mutate };
}
