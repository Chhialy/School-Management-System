import { z } from 'zod';

// Student Schema
export const studentSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  studentId: z.string().min(1, 'Student ID is required'),
  grade: z.string().min(1, 'Grade is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  enrolledCourses: z.array(z.string()).default([]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Teacher Schema
export const teacherSchema = z.object({
  _id: z.string().optional(),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  teacherId: z.string().min(1, 'Teacher ID is required'),
  department: z.string().min(1, 'Department is required'),
  subject: z.string().min(1, 'Subject is required'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  assignedCourses: z.array(z.string()).default([]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Course Schema
export const courseSchema = z.object({
  _id: z.string().optional(),
  courseName: z.string().min(1, 'Course name is required'),
  courseCode: z.string().min(1, 'Course code is required'),
  description: z.string().optional(),
  credits: z.number().min(1, 'Credits must be at least 1'),
  duration: z.string().min(1, 'Duration is required'),
  teacherId: z.string().optional(),
  teacherName: z.string().optional(),
  enrolledStudents: z.array(z.string()).default([]),
  maxStudents: z.number().min(1, 'Maximum students must be at least 1'),
  schedule: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Types
export type Student = z.infer<typeof studentSchema>;
export type Teacher = z.infer<typeof teacherSchema>;
export type Course = z.infer<typeof courseSchema>;

// Form Schemas (without optional fields for forms)
export const studentFormSchema = studentSchema.omit({ 
  _id: true, 
  createdAt: true, 
  updatedAt: true,
  enrolledCourses: true 
});

export const teacherFormSchema = teacherSchema.omit({ 
  _id: true, 
  createdAt: true, 
  updatedAt: true,
  assignedCourses: true 
});

export const courseFormSchema = courseSchema.omit({ 
  _id: true, 
  createdAt: true, 
  updatedAt: true,
  teacherName: true,
  enrolledStudents: true 
});

export type StudentFormData = z.infer<typeof studentFormSchema>;
export type TeacherFormData = z.infer<typeof teacherFormSchema>;
export type CourseFormData = z.infer<typeof courseFormSchema>;