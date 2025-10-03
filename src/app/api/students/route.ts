import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { studentFormSchema } from '@/lib/schemas';

// GET /api/students - Get all students
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('school-management');
    
    const students = await db.collection('students').find({}).toArray();
    
    return NextResponse.json({
      success: true,
      data: students.map(student => ({
        ...student,
        _id: student._id.toString()
      }))
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 }
    );
  }
}

// POST /api/students - Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
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
    
    // Check if student ID already exists
    const existingStudent = await db.collection('students').findOne({
      studentId: validationResult.data.studentId
    });
    
    if (existingStudent) {
      return NextResponse.json(
        { success: false, error: 'Student ID already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists
    const existingEmail = await db.collection('students').findOne({
      email: validationResult.data.email
    });
    
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 409 }
      );
    }

    const newStudent = {
      ...validationResult.data,
      enrolledCourses: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('students').insertOne(newStudent);
    
    return NextResponse.json({
      success: true,
      data: {
        ...newStudent,
        _id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create student' },
      { status: 500 }
    );
  }
}