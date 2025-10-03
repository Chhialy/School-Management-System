import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { courseFormSchema } from '@/lib/schemas';

// GET /api/courses/[id] - Get a specific course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    const course = await db.collection('courses').findOne({
      _id: new ObjectId(id)
    });
    
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Get teacher name if teacherId exists
    let teacherName = '';
    if (course.teacherId && ObjectId.isValid(course.teacherId)) {
      const teacher = await db.collection('teachers').findOne({
        _id: new ObjectId(course.teacherId)
      });
      if (teacher) {
        teacherName = `${teacher.firstName} ${teacher.lastName}`;
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        ...course,
        _id: course._id.toString(),
        teacherName
      }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id] - Update a specific course
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    // Validate the request body
    const validationResult = courseFormSchema.safeParse(body);
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
    
    // Check if course exists
    const existingCourse = await db.collection('courses').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Check if course code already exists (excluding current course)
    const duplicateCourseCode = await db.collection('courses').findOne({
      courseCode: validationResult.data.courseCode,
      _id: { $ne: new ObjectId(id) }
    });
    
    if (duplicateCourseCode) {
      return NextResponse.json(
        { success: false, error: 'Course code already exists' },
        { status: 409 }
      );
    }

    // Get teacher name if teacherId is provided
    let teacherName = '';
    if (validationResult.data.teacherId && ObjectId.isValid(validationResult.data.teacherId)) {
      const teacher = await db.collection('teachers').findOne({
        _id: new ObjectId(validationResult.data.teacherId)
      });
      if (teacher) {
        teacherName = `${teacher.firstName} ${teacher.lastName}`;
      }
    }

    const updatedCourse = {
      ...validationResult.data,
      teacherName,
      updatedAt: new Date()
    };

    const result = await db.collection('courses').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedCourse }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    const updated = await db.collection('courses').findOne({
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
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] - Delete a specific course
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('school-management');
    
    // Check if course exists
    const existingCourse = await db.collection('courses').findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Remove course from students' enrolled courses
    await db.collection('students').updateMany(
      { enrolledCourses: id },
      // @ts-expect-error - MongoDB $pull operation
      { $pull: { enrolledCourses: id } }
    );

    // Remove course from teachers' assigned courses
    await db.collection('teachers').updateMany(
      { assignedCourses: id },
      // @ts-expect-error - MongoDB $pull operation
      { $pull: { assignedCourses: id } }
    );

    const result = await db.collection('courses').deleteOne({
      _id: new ObjectId(id)
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}