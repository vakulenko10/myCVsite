import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { ProjectDescription } from '@/models/models';
import mongoose from 'mongoose';

interface RouteContext {
  params: {
    portfolioId: string;
  };
}

/**
 * GET /api/project-descriptions/portfolio/[portfolioId]
 * Get a project description by portfolio item ID
 * This is useful when clicking on a project to view its description
 */
export async function GET(_req: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { portfolioId } = params;

    // Validate portfolioId format
    if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid portfolioId format',
          message: 'portfolioId must be a valid MongoDB ObjectId',
        },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const projectDescription = await ProjectDescription.findOne({ portfolioItemId: portfolioId });

    if (!projectDescription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Project description not found for this portfolio item',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: projectDescription,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching project description by portfolio ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch project description',
      },
      { status: 500 }
    );
  }
}

