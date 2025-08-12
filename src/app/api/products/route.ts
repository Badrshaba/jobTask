/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from '@/models/Product';
import { CreateProductDTO } from '@/lib/dtos';
import db_connection from '@/lib/dbConnect';
import { NextResponse, NextRequest } from 'next/server';

/**
 * @method  GET
 * @route   /api/products
 * @desc    Get all products
 * @access  Public
 */
export async function GET(req: Request) {
  try {
    await db_connection();

    // get data from query parameters
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Filter products
    const filter: any = {};

    if (category) {
      filter.category = category;
    }
    // Search
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: 'i' } }, { category: { $regex: search, $options: 'i' } }];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // get products from database
    const products = await Product.find(filter).skip(skip).limit(limit).exec();

    // get total products
    const total = await Product.countDocuments(filter);

    // return response
    return NextResponse.json({
      message: 'successfully get all products',
      success: true,
      page,
      limit,
      total,
      products,
    });
  } catch (error: any) {
    // return error
    return NextResponse.json(
      {
        message: error.message as string,
        success: false,
      },
      { status: 500 }
    );
  }
}

/**
 * @method  POST
 * @route   /api/products
 * @desc    Create product
 * @access  Private
 */
export async function POST(req: NextRequest) {
  try {
    // connection to database
    await db_connection();

    // destructure body
    const { category, title, description, image, price } = (await req.json()) as CreateProductDTO;

    // create product
    const product = await Product.create({
      category,
      title,
      description,
      image,
      price,
    });

    // return response
    return NextResponse.json({
      message: 'successfully created product',
      success: true,
      status: 201,
      product,
    });
  } catch (error: any) {
    // return error
    return NextResponse.json(
      {
        message: error.message as string,
        success: false,
      },
      { status: 500 }
    );
  }
}
