import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { AskMeQuestion } from '@/models/models';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id, direction } = body as { id?: string; direction?: 'up' | 'down' };

    if (!id || !direction || !['up', 'down'].includes(direction)) {
      return NextResponse.json(
        { message: 'Missing or invalid id or direction' },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const item = await AskMeQuestion.findById(id);
    if (!item) {
      return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    const currentOrder = item.order ?? 0;
    const nextOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;

    const swapWith = await AskMeQuestion.findOne({
      order: nextOrder,
    });

    if (swapWith) {
      await AskMeQuestion.findByIdAndUpdate(id, { order: nextOrder });
      await AskMeQuestion.findByIdAndUpdate(swapWith._id, { order: currentOrder });
    } else {
      await AskMeQuestion.findByIdAndUpdate(id, { order: nextOrder });
    }

    const contentItems = await AskMeQuestion.find().sort({ order: 1 });
    return NextResponse.json({ contentItems });
  } catch (error) {
    console.error('Error reordering askmequestions:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
