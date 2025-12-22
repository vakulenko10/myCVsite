import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { sectionToModelMap, getModelProperties } from '@/libs/sectionUtils';
import type { SectionName } from '@/types';

interface RouteContext {
  params: {
    sectionName: SectionName;
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { sectionName, id } = params;
    const modelProperties = getModelProperties(sectionName);
    console.log('sectionName:', sectionName);
    console.log('id:', id);

    console.log('Starting GET method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const model = sectionToModelMap[sectionName];

    if (!model) {
      return NextResponse.json({ message: 'Invalid sectionName' }, { status: 400 });
    }

    const contentItem = await model.findOne({ _id: id });

    if (!contentItem) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    console.log('Content item:', contentItem);

    return NextResponse.json({ contentItem, modelProperties }, { status: 200 });
  } catch (error) {
    console.error('Error in GET method:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  try {
    const propertiesToExclude = ['_id', 'createdAt', 'updatedAt', '__v'];
    const { sectionName, id } = params;
    const body = await request.json();
    console.log('sectionName:', sectionName);
    console.log('id:', id);
    console.log('Received data:', body);

    console.log('Starting PUT method');
    await connectMongoDB();
    console.log('Connected to MongoDB');

    const model = sectionToModelMap[sectionName];

    if (!model) {
      return NextResponse.json({ message: 'Invalid sectionName' }, { status: 400 });
    }

    // Get the valid properties from the model schema
    const modelProperties = getModelProperties(sectionName);
    // Extract only the valid properties from the request body
    const filteredData: Record<string, unknown> = {};
    Object.keys(body).forEach((key) => {
      if (modelProperties && modelProperties.includes(key) && !propertiesToExclude.includes(key)) {
        filteredData[key] = body[key];
      }
    });

    // Update the document with the filtered data
    const updatedContentItem = await model.findByIdAndUpdate(id, filteredData, { new: true });

    return NextResponse.json({ message: 'Item updated', updatedContentItem }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT method:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


