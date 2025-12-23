import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { ProjectDescription } from '@/models/models';
import mongoose from 'mongoose';

/**
 * GET /api/project-descriptions
 * Get all project descriptions
 */
export async function GET(_req: NextRequest): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const projectDescriptions = await ProjectDescription.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: projectDescriptions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching project descriptions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to fetch project descriptions',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/project-descriptions
 * Create a new project description
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { portfolioItemId, enMarkdownContent, uaMarkdownContent, plMarkdownContent } = body;

    // Validation
    if (!portfolioItemId) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'portfolioItemId is required',
        },
        { status: 400 }
      );
    }

    // Validate portfolioItemId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(portfolioItemId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid portfolioItemId format',
          message: 'portfolioItemId must be a valid MongoDB ObjectId',
        },
        { status: 400 }
      );
    }

    // Check if a description already exists for this portfolio item
    const existingDescription = await ProjectDescription.findOne({ portfolioItemId });
    if (existingDescription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Description already exists',
          message: 'A project description already exists for this portfolio item. Use PUT to update it.',
        },
        { status: 409 }
      );
    }

    // Create new project description
    const projectDescription = await ProjectDescription.create({
      portfolioItemId,
      enMarkdownContent,
      uaMarkdownContent,
      plMarkdownContent,
    });

    return NextResponse.json(
      {
        success: true,
        data: projectDescription,
        message: 'Project description created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project description:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to create project description',
      },
      { status: 500 }
    );
  }
}

