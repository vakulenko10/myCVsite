import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { sectionToModelMap, getModelProperties } from '@/libs/sectionUtils';
import mongoose from 'mongoose';
import type { SectionName } from '@/types';

interface RouteContext {
  params: {
    sectionName: SectionName;
  };
}

export async function GET(req: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  try {
    console.log('params.sectionName: ', params.sectionName);
    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    console.log('Keys in sectionToModelMap:', Object.keys(sectionToModelMap));
    console.log('params:', params);
    const model = sectionToModelMap[params.sectionName];
    console.log('sectionToModelMap[params.sectionName]', sectionToModelMap[params.sectionName]);
    console.log('model:', model);

    if (!model) {
      return NextResponse.json({ message: 'Invalid sectionName' }, { status: 400 });
    }
    const modelProperties = getModelProperties(params.sectionName);
    const contentItems = await model.find();
    console.log('Content items:', contentItems);

    return NextResponse.json({ contentItems, modelProperties }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const propertiesToExclude = ['_id', 'createdAt', 'updatedAt', '__v'];
    const { sectionName } = params;
    console.log('sectionName:', sectionName);
    const body = await request.json();

    console.log('Received data:', body);

    console.log('Starting POST method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const model = sectionToModelMap[sectionName];

    if (!model) {
      return NextResponse.json({ message: 'Invalid sectionName' }, { status: 400 });
    }

    // Get the valid properties from the model schema
    const modelProperties = getModelProperties(sectionName);

    if (!modelProperties) {
      return NextResponse.json(
        { message: 'Failed to retrieve model properties' },
        { status: 500 }
      );
    }

    // Extract only the valid properties from the request body
    const filteredData: Record<string, unknown> = {};
    Object.keys(body).forEach((key) => {
      if (modelProperties.includes(key) && !propertiesToExclude.includes(key)) {
        filteredData[key] = body[key];
      }
    });
    console.log('filteredData', filteredData);

    // Create a new document with the filtered data
    await model.create(filteredData);

    return NextResponse.json({ message: 'Item created' }, { status: 201 });
  } catch (error) {
    console.error('Error in POST method:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    if (!request.url) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    console.log('id: ', id);
    // Check if id is a valid MongoDB ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid id format' }, { status: 400 });
    }

    await connectMongoDB();

    const model = sectionToModelMap[params.sectionName];

    if (!model) {
      return NextResponse.json({ message: 'Invalid sectionName' }, { status: 400 });
    }

    const deletedItem = await model.findOneAndDelete({ _id: id });

    // Check if the item was not found
    if (!deletedItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

