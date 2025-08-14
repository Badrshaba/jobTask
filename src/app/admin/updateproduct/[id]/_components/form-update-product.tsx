/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import useUpdateProduct from '@/hooks/useUpdateProduct';

export default function FormUpdateProduct({ product }: { product: Product }) {
  const { isPending, error, updateProduct } = useUpdateProduct();

  const formSchema = z.object({
    title: z
      .string({ message: 'Title is required' })
      .min(1, {
        message: 'Title is required',
      })
      .max(50, {
        message: 'Title must be at most 50 characters.',
      }),
    image: z
      .string()
      .min(1, {
        message: 'Image is required',
      })
      .max(500, {
        message: 'Image must be at most 500 characters.',
      }),
    price: z.string().min(0, {
      message: 'Price is required',
    }),
    description: z
      .string()
      .min(1, {
        message: 'Description is required',
      })
      .max(1000, {
        message: 'Description must be at most 1000 characters.',
      }),
    category: z
      .string()
      .min(1, {
        message: 'Category is required',
      })
      .max(50, {
        message: 'Category must be at most 50 characters.',
      }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      image: '',
      price: '',
      description: '',
      category: '',
    },
  });

  useEffect(() => {
    form.reset({
      title: product.title,
      image: product.image,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
    });
  }, [product]);

  function onSubmit(data: FormData) {
    updateProduct({ ...data, _id: product._id, price: Number(data.price) });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8  w-11/12 md:w-9/12'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='title'
                  className='shadow-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder='image url'
                  className='shadow-sm'
                  type='url'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder='price'
                  className='shadow-sm'
                  type='number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder='category'
                  className='shadow-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='description'
                  className='shadow-sm'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className='text-red-500'>{error.message}</p>}
        <Button
          className=' cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl transition-all duration-300  '
          disabled={isPending}
          type='submit'>
          {isPending ? 'Updating...' : 'Update Product'}
        </Button>
      </form>
    </Form>
  );
}
