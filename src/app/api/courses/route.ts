import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import { courseFormSchema } from '@/lib/schemas';

// GET /api/courses - Get all courses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('school-management');
    
    const courses = await db.collection('courses').find({}).toArray();
    
    // Populate teacher names
    const coursesWithTeachers = await Promise.all(
      courses.map(async (course) => {
        let teacherName = '';
        if (course.teacherId && ObjectId.isValid(course.teacherId)) {
          const teacher = await db.collection('teachers').findOne({
            _id: new ObjectId(course.teacherId)
          });
          if (teacher) {
            teacherName = `${teacher.firstName} ${teacher.lastName}`;
          }
        }
        
        return {
          ...course,
          _id: course._id.toString(),
          teacherName
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      data: coursesWithTeachers
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
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
    
    // Check if course code already exists
    const existingCourse = await db.collection('courses').findOne({
      courseCode: validationResult.data.courseCode
    });
    
    if (existingCourse) {
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

    const newCourse = {
      ...validationResult.data,
      teacherName,
      enrolledStudents: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('courses').insertOne(newCourse);
    
    return NextResponse.json({
      success: true,
      data: {
        ...newCourse,
        _id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}