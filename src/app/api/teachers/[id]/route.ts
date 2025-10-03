import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { teacherFormSchema } from '@/lib/schemas';

// GET /api/teachers/[id] - Get a specific teacher
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    const teacher = await db.collection('teachers').findOne({
      _id: new ObjectId(id)
    });
    
    if (!teacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...teacher,
        _id: teacher._id.toString()
      }
    });
  } catch (error) {
    console.error('Error fetching teacher:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teacher' },
      { status: 500 }
    );
  }
}

// PUT /api/teachers/[id] - Update a specific teacher
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher ID' },
        { status: 400 }
      );
    }

    // Validate the request body
    const validationResult = teacherFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    // Check if teacher exists
    const existingTeacher = await db.collection('teachers').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingTeacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    // Check if teacher ID already exists (excluding current teacher)
    const duplicateTeacherId = await db.collection('teachers').findOne({
      teacherId: validationResult.data.teacherId,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (duplicateTeacherId) {
      return NextResponse.json(
        { success: false, error: 'Teacher ID already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists (excluding current teacher)
    const duplicateEmail = await db.collection('teachers').findOne({
      email: validationResult.data.email,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (duplicateEmail) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 409 }
      );
    }

    const updatedTeacher = {
      ...validationResult.data,
      updatedAt: new Date()
    };

    const result = await db.collection('teachers').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedTeacher }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    const updated = await db.collection('teachers').findOne({
      _id: new ObjectId(id)
    });
    
    return NextResponse.json({
      success: true,
      data: {
        ...updated,
        _id: updated!._id.toString()
      }
    });
  } catch (error) {
    console.error('Error updating teacher:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update teacher' },
      { status: 500 }
    );
  }
}

// DELETE /api/teachers/[id] - Delete a specific teacher
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid teacher ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    // Check if teacher exists
    const existingTeacher = await db.collection('teachers').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingTeacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }

    // Remove teacher from assigned courses
    await db.collection('courses').updateMany(
      { teacherId: id },
      { $unset: { teacherId: "", teacherName: "" } }
    );

    const result = await db.collection('teachers').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Teacher not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting teacher:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete teacher' },
      { status: 500 }
    );
  }
}