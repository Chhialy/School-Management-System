import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { studentFormSchema } from '@/lib/schemas';

// GET /api/students/[id] - Get a specific student
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    const student = await db.collection('students').findOne({
      _id: new ObjectId(id)
    });
    
    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...student,
        _id: student._id.toString()
      }
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}

// PUT /api/students/[id] - Update a specific student
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    // Validate the request body
    const validationResult = studentFormSchema.safeParse(body);
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
    
    // Check if student exists
    const existingStudent = await db.collection('students').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingStudent) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    // Check if student ID already exists (excluding current student)
    const duplicateStudentId = await db.collection('students').findOne({
      studentId: validationResult.data.studentId,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (duplicateStudentId) {
      return NextResponse.json(
        { success: false, error: 'Student ID already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists (excluding current student)
    const duplicateEmail = await db.collection('students').findOne({
      email: validationResult.data.email,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (duplicateEmail) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 409 }
      );
    }

    const updatedStudent = {
      ...validationResult.data,
      updatedAt: new Date()
    };

    const result = await db.collection('students').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedStudent }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    const updated = await db.collection('students').findOne({
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
    console.error('Error updating student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

// DELETE /api/students/[id] - Delete a specific student
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid student ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    // Check if student exists
    const existingStudent = await db.collection('students').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingStudent) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    // Remove student from enrolled courses
    await db.collection('courses').updateMany(
      { enrolledStudents: id },
      // @ts-expect-error - MongoDB $pull operation
      { $pull: { enrolledStudents: id } }
    );

    const result = await db.collection('students').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}