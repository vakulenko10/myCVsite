import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongo_db';
import { ProjectDescription } from '@/models/models';
import mongoose from 'mongoose';

interface RouteContext {
  params: {
    id: string;
  };
}

/**
 * GET /api/project-descriptions/[id]
 * Get a single project description by ID
 */
export async function GET(_req: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { id } = params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid ID format',
          message: 'ID must be a valid MongoDB ObjectId',
        },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const projectDescription = await ProjectDescription.findById(id);

    if (!projectDescription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Project description not found',
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
    console.error('Error fetching project description:', error);
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

/**
 * PUT /api/project-descriptions/[id]
 * Update a project description by ID
 */
export async function PUT(request: NextRequest, { params }: RouteContext): Promise<NextResponse> {
  try {
    const { id } = params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid ID format',
          message: 'ID must be a valid MongoDB ObjectId',
        },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const body = await request.json();
    const { portfolioItemId, enMarkdownContent, uaMarkdownContent, plMarkdownContent } = body;

    // Build update object with only provided fields
    const updateData: {
      portfolioItemId?: string;
      enMarkdownContent?: string;
      uaMarkdownContent?: string;
      plMarkdownContent?: string;
    } = {};
    if (portfolioItemId !== undefined) {
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
      updateData.portfolioItemId = portfolioItemId;
    }
    if (enMarkdownContent !== undefined) {
      updateData.enMarkdownContent = enMarkdownContent;
    }
    if (uaMarkdownContent !== undefined) {
      updateData.uaMarkdownContent = uaMarkdownContent;
    }
    if (plMarkdownContent !== undefined) {
      updateData.plMarkdownContent = plMarkdownContent;
    }

    // Check if at least one field is provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'No fields to update',
          message: 'At least one field must be provided',
        },
        { status: 400 }
      );
    }

    // Update the project description
    const updatedDescription = await ProjectDescription.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDescription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Project description not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updatedDescription,
        message: 'Project description updated successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating project description:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to update project description',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/project-descriptions/[id]
 * Delete a project description by ID
 */
export async function DELETE(
  _req: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid ID format',
          message: 'ID must be a valid MongoDB ObjectId',
        },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const deletedDescription = await ProjectDescription.findByIdAndDelete(id);

    if (!deletedDescription) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not found',
          message: 'Project description not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Project description deleted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting project description:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error',
        message: 'Failed to delete project description',
      },
      { status: 500 }
    );
  }
}

