'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { Course } from '@/lib/schemas';
import CourseForm from './components/CourseForm';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.teacherName && course.teacherName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredCourses(filtered);
  }, [courses, searchTerm]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.data);
      } else {
        toast.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Course deleted successfully');
        fetchCourses();
      } else {
        toast.error(data.error || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    fetchCourses();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center fade-in">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white text-lg font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="glass border-b border-white/30 backdrop-blur-xl shadow-2xl fixed top-16 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 fade-in">
              <Link href="/" className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-110 transform">
                <ArrowLeft size={24} />
              </Link>
              <div className="flex items-center space-x-3">
                <BookOpen className="text-purple-300" size={28} />
                <h1 className="text-3xl font-bold text-white">Courses</h1>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-purple-500/30 hover:bg-purple-500/50 border-purple-300/50 text-white shadow-lg hover:scale-105 transition-all duration-300">
              <Plus size={20} className="mr-2" />
              Add Course
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Search and Stats */}
        <div className="mb-8 fade-in">
          <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl">
            <CardContent className="py-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all"
                  />
                </div>
                <div className="text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-lg">
                  {filteredCourses.length} of {courses.length} courses
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl fade-in">
            <CardContent className="py-12 text-center">
              <BookOpen size={64} className="mx-auto text-white/40 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchTerm ? 'No courses found' : 'No courses yet'}
              </h3>
              <p className="text-white/70 mb-4 text-lg">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Get started by adding your first course'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsModalOpen(true)} className="bg-purple-500/30 hover:bg-purple-500/50 border-purple-300/50 text-white shadow-lg hover:scale-105 transition-all duration-300">
                  <Plus size={20} className="mr-2" />
                  Add First Course
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {filteredCourses.map((course) => (
              <Card key={course._id} className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">{course.courseName}</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(course)}
                        className="hover:bg-purple-500/30 text-white hover:scale-110 transition-all duration-300"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(course._id!)}
                        className="hover:bg-red-500/30 text-white hover:scale-110 transition-all duration-300"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Course Code:</span>
                      <span className="text-sm font-bold text-white bg-purple-500/20 px-3 py-1 rounded">{course.courseCode}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Credits:</span>
                      <span className="text-sm font-bold text-white bg-blue-500/20 px-3 py-1 rounded">{course.credits}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Duration:</span>
                      <span className="text-sm font-medium text-white">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Max Students:</span>
                      <span className="text-sm font-bold text-white bg-orange-500/20 px-3 py-1 rounded">{course.maxStudents}</span>
                    </div>
                    {course.teacherName && (
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-sm text-white/60 font-medium">Teacher:</span>
                        <span className="text-sm font-medium text-green-300">{course.teacherName}</span>
                      </div>
                    )}
                    {course.schedule && (
                      <div className="flex justify-between items-center py-2 border-b border-white/10">
                        <span className="text-sm text-white/60 font-medium">Schedule:</span>
                        <span className="text-sm font-medium text-white">{course.schedule}</span>
                      </div>
                    )}
                    {course.description && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <span className="text-sm text-white/60 font-medium">Description:</span>
                        <p className="text-sm text-white/80 mt-2 line-clamp-2">{course.description}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Course Form Modal */}
      <CourseForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleFormSuccess}
        course={editingCourse}
      />
    </div>
  );
}