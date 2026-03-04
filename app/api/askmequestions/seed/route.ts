import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { AskMeQuestion } from '@/models/models';

const DEFAULT_QUESTIONS: Array<{
  enText: string;
  uaText: string;
  plText: string;
  autoSend: boolean;
  order: number;
}> = [
  {
    enText: 'How can I contact you?',
    uaText: 'How can I contact you?',
    plText: 'How can I contact you?',
    autoSend: true,
    order: 0,
  },
  {
    enText: 'Show me your social medias',
    uaText: 'Show me your social medias',
    plText: 'Show me your social medias',
    autoSend: false,
    order: 1,
  },
  {
    enText: "What's your best project and why are you proud of it?",
    uaText: "What's your best project and why are you proud of it?",
    plText: "What's your best project and why are you proud of it?",
    autoSend: false,
    order: 2,
  },
  {
    enText: 'Tell me about your tech stack and what you want to learn',
    uaText: 'Tell me about your tech stack and what you want to learn',
    plText: 'Tell me about your tech stack and what you want to learn',
    autoSend: false,
    order: 3,
  },
  {
    enText: 'What makes you different from other developers?',
    uaText: 'What makes you different from other developers?',
    plText: 'What makes you different from other developers?',
    autoSend: false,
    order: 4,
  },
  {
    enText: 'Why should I hire you for my company?',
    uaText: 'Why should I hire you for my company?',
    plText: 'Why should I hire you for my company?',
    autoSend: false,
    order: 5,
  },
  {
    enText: 'What kind of problems excite you?',
    uaText: 'What kind of problems excite you?',
    plText: 'What kind of problems excite you?',
    autoSend: false,
    order: 6,
  },
  {
    enText: 'Where can I download your portfolio (PDF)?',
    uaText: 'Where can I download your portfolio (PDF)?',
    plText: 'Where can I download your portfolio (PDF)?',
    autoSend: false,
    order: 7,
  },
  {
    enText: 'Show me your CV',
    uaText: 'Show me your CV',
    plText: 'Show me your CV',
    autoSend: false,
    order: 8,
  },
  {
    enText: 'Play the site background animation',
    uaText: 'Play the site background animation',
    plText: 'Play the site background animation',
    autoSend: false,
    order: 9,
  },
];

export async function POST(): Promise<NextResponse> {
  try {
    await connectMongoDB();
    await AskMeQuestion.deleteMany({});
    await AskMeQuestion.insertMany(DEFAULT_QUESTIONS);
    const contentItems = await AskMeQuestion.find().sort({ order: 1 });
    return NextResponse.json({
      message: 'Seeded 10 default questions',
      contentItems,
    });
  } catch (error) {
    console.error('Error seeding askmequestions:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
