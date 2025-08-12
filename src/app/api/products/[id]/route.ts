/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from '@/models/Product';
import { UpdateProductDTO } from '@/lib/dtos';
import db_connection from '@/lib/dbConnect';
import { NextResponse, NextRequest } from 'next/server';

// interface Props {
//   params: {
//     id: string;
//   };
// }

/**
 * @method  GET
 * @route   /api/products/:id
 * @desc    Get product by id
 * @access  Public
 */

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // connection to database
    await db_connection();
    const REGLEX = /^[a-fA-F0-9]{24}$/;
    // destructure params
    const { id } = await params;

    // validate id
    if (!REGLEX.test(id)) {
      return NextResponse.json(
        {
          message: 'invalid product id',
          success: false,
        },
        { status: 400 }
      );
    }

    // get product by id
    const product = await Product.findById(id);

    // return response
    return NextResponse.json({
      message: 'successfully get product by id',
      success: true,
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // connection to database
    await db_connection();

    // destructure params
    const { id } = await params;

    // get product by id
    const product = await Product.deleteOne({ _id: id });

    // check if product deleted
    if (product.deletedCount === 0) {
      return NextResponse.json(
        {
          message: 'something wrong , failed to delete product',
          success: false,
        },
        { status: 400 }
      );
    }

    // return response
    return NextResponse.json({
      message: 'successfully delete product',
      success: true,
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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // connection to database
    await db_connection();

    // destructure params
    const { id } = await params;

    // destructure body
    const { title, price, description, image, category } = (await req.json()) as UpdateProductDTO;

    // update product
    const product = await Product.updateOne({ _id: id }, { title, price, description, image, category });

    // check if product updated
    if (product.modifiedCount === 0) {
      return NextResponse.json(
        {
          message: 'something wrong , failed to update product',
          success: false,
        },
        { status: 400 }
      );
    }

    // return response
    return NextResponse.json({
      message: 'successfully updated product',
      success: true,
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
