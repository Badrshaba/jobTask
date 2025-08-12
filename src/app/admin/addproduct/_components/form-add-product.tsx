'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useCreateProduct from '@/hooks/useCreateProduct';

export default function FormAddProduct() {
  const { isPending, error, createProduct } = useCreateProduct();

  const formSchema = z.object({
    title: z
      .string({ message: 'Title is required' })
      .min(1, {
        message: 'Title is required',
      })
      .max(50, {
        message: 'Title must be at most 50 characters.',
      }),
    image: z.string().min(1, {
      message: 'Image is required',
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

  function onSubmit(data: FormData) {
    createProduct(data);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 w-11/12 md:w-9/12 '>
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
          className=' cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-300  '
          disabled={isPending}
          type='submit'>
          {isPending ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  );
}
