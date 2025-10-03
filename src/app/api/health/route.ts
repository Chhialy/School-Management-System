import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('school-management');
    
    // Test database connection
    await db.admin().ping();
    
    // Get collection stats
    const students = await db.collection('students').countDocuments();
    const teachers = await db.collection('teachers').countDocuments();
    const courses = await db.collection('courses').countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      stats: {
        students,
        teachers,
        courses
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}