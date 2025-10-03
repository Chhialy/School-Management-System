'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Edit, Trash2, Search, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading';
import { Teacher } from '@/lib/schemas';
import TeacherForm from './components/TeacherForm';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(teacher =>
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [teachers, searchTerm]);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers');
      const data = await response.json();
      
      if (data.success) {
        setTeachers(data.data);
      } else {
        toast.error('Failed to fetch teachers');
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast.error('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
      const response = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      } else {
        toast.error(data.error || 'Failed to delete teacher');
      }
    } catch (error) {
      console.error('Error deleting teacher:', error);
      toast.error('Failed to delete teacher');
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
    fetchTeachers();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTeacher(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center fade-in">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-white text-lg font-medium">Loading teachers...</p>
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
                <UserCheck className="text-green-300" size={28} />
                <h1 className="text-3xl font-bold text-white">Teachers</h1>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-500/30 hover:bg-green-500/50 border-green-300/50 text-white shadow-lg hover:scale-105 transition-all duration-300">
              <Plus size={20} className="mr-2" />
              Add Teacher
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
                    placeholder="Search teachers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all"
                  />
                </div>
                <div className="text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-lg">
                  {filteredTeachers.length} of {teachers.length} teachers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length === 0 ? (
          <Card className="glass border-white/30 backdrop-blur-xl shadow-2xl fade-in">
            <CardContent className="py-12 text-center">
              <UserCheck size={64} className="mx-auto text-white/40 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchTerm ? 'No teachers found' : 'No teachers yet'}
              </h3>
              <p className="text-white/70 mb-4 text-lg">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Get started by adding your first teacher'
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsModalOpen(true)} className="bg-green-500/30 hover:bg-green-500/50 border-green-300/50 text-white shadow-lg hover:scale-105 transition-all duration-300">
                  <Plus size={20} className="mr-2" />
                  Add First Teacher
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher._id} className="glass border-white/30 backdrop-blur-xl shadow-2xl card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">
                      {teacher.firstName} {teacher.lastName}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(teacher)}
                        className="hover:bg-green-500/30 text-white hover:scale-110 transition-all duration-300"
                      >
                        <Edit size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(teacher._id!)}
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
                      <span className="text-sm text-white/60 font-medium">Teacher ID:</span>
                      <span className="text-sm font-bold text-white bg-green-500/20 px-3 py-1 rounded">{teacher.teacherId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Department:</span>
                      <span className="text-sm font-bold text-white bg-purple-500/20 px-3 py-1 rounded">{teacher.department}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Subject:</span>
                      <span className="text-sm font-bold text-white bg-orange-500/20 px-3 py-1 rounded">{teacher.subject}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-sm text-white/60 font-medium">Email:</span>
                      <span className="text-sm font-medium text-blue-300">{teacher.email}</span>
                    </div>
                    {teacher.phoneNumber && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-white/60 font-medium">Phone:</span>
                        <span className="text-sm font-medium text-white">{teacher.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Teacher Form Modal */}
      <TeacherForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleFormSuccess}
        teacher={editingTeacher}
      />
    </div>
  );
}