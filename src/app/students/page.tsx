'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { Student } from '@/lib/schemas';
import StudentForm from './components/StudentForm';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [students, searchTerm]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      
      if (data.success) {
        setStudents(data.data);
      } else {
        toast.error('Failed to fetch students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Student deleted successfully');
        fetchStudents();
      } else {
        toast.error(data.error || 'Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    fetchStudents();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center fade-in">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white text-lg font-medium">Loading students...</p>
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
                <Users className="text-blue-300" size={28} />
                <h1 className="text-3xl font-bold text-white">Students</h1>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500/30 hover:bg-blue-500/50 border-blue-300/50 text-white shadow-lg hover:scale-105 transition-all duration-300">
              <Plus size={20} className="mr-2" />
              Add Student
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
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all"
                  />
                </div>
                <div className="text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-lg">
                  {filteredStudents.length} of {students.length} students
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Grid */}
        {filteredStudents.length === 0 ? (
          <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl fade-in">
            <CardContent className="py-12 text-center">
              <Users size={64} className="mx-auto text-white/40 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchTerm ? 'No students found' : 'No students yet'}
              </h3>
              <p className="text-white/70 mb-4 text-lg">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Get started by adding your first student'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsModalOpen(true)} className="bg-blue-500/30 hover:bg-blue-500/50 border-blue-300/50 text-white shadow-lg hover:scale-105 transition-all duration-300">
                  <Plus size={20} className="mr-2" />
                  Add First Student
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {filteredStudents.map((student) => (
              <Card key={student._id} className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                      {student.firstName} {student.lastName}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(student)}
                        className="hover:bg-blue-500/30 text-white hover:scale-110 transition-all duration-300"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(student._id!)}
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
                      <span className="text-sm text-white/60 font-medium">Student ID:</span>
                      <span className="text-sm font-bold text-white bg-blue-500/20 px-3 py-1 rounded">{student.studentId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Grade:</span>
                      <span className="text-sm font-bold text-white bg-green-500/20 px-3 py-1 rounded">{student.grade}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Email:</span>
                      <span className="text-sm font-medium text-blue-300">{student.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">DOB:</span>
                      <span className="text-sm font-medium text-white">
                        {new Date(student.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                    {student.phoneNumber && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-white/60 font-medium">Phone:</span>
                        <span className="text-sm font-medium text-white">{student.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Student Form Modal */}
      <StudentForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleFormSuccess}
        student={editingStudent}
      />
    </div>
  );
}