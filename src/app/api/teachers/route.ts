import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { teacherFormSchema } from '@/lib/schemas';

// GET /api/teachers - Get all teachers
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('school-management');
    
    const teachers = await db.collection('teachers').find({}).toArray();
    
    return NextResponse.json({
      success: true,
      data: teachers.map(teacher => ({
        ...teacher,
        _id: teacher._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch teachers' },
      { status: 500 }
    );
  }
}

// POST /api/teachers - Create a new teacher
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
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
    
    // Check if teacher ID already exists
    const existingTeacher = await db.collection('teachers').findOne({
      teacherId: validationResult.data.teacherId
    });
    
    if (existingTeacher) {
      return NextResponse.json(
        { success: false, error: 'Teacher ID already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists
    const existingEmail = await db.collection('teachers').findOne({
      email: validationResult.data.email
    });
    
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 409 }
      );
    }

    const newTeacher = {
      ...validationResult.data,
      assignedCourses: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('teachers').insertOne(newTeacher);
    
    return NextResponse.json({
      success: true,
      data: {
        ...newTeacher,
        _id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create teacher' },
      { status: 500 }
    );
  }
}