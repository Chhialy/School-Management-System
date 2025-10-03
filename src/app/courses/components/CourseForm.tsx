'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { LoadingSpinner } from '@/components/ui/loading';
import { Course, CourseFormData, courseFormSchema, Teacher } from '@/lib/schemas';

interface CourseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  course?: Course | null;
}

const CourseForm: React.FC<CourseFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  course
}) => {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const isEditing = !!course;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema)
  });

  useEffect(() => {
    if (isOpen) {
      fetchTeachers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (course) {
      setValue('courseName', course.courseName);
      setValue('courseCode', course.courseCode);
      setValue('description', course.description || '');
      setValue('credits', course.credits);
      setValue('duration', course.duration);
      setValue('teacherId', course.teacherId || '');
      setValue('maxStudents', course.maxStudents);
      setValue('schedule', course.schedule || '');
    } else {
      reset();
    }
  }, [course, setValue, reset]);

  const fetchTeachers = async () => {
    setLoadingTeachers(true);
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
      setLoadingTeachers(false);
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    
    try {
      const url = isEditing ? `/api/courses/${course._id}` : '/api/courses';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(
          isEditing 
            ? 'Course updated successfully!' 
            : 'Course created successfully!'
        );
        reset();
        onSuccess();
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save course');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Course' : 'Add New Course'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Course Name"
            {...register('courseName')}
            error={errors.courseName?.message}
            disabled={loading}
          />
          
          <Input
            label="Course Code"
            {...register('courseCode')}
            error={errors.courseCode?.message}
            disabled={loading}
          />
          
          <Input
            label="Credits"
            type="number"
            {...register('credits', { valueAsNumber: true })}
            error={errors.credits?.message}
            disabled={loading}
          />
          
          <Input
            label="Duration"
            {...register('duration')}
            error={errors.duration?.message}
            disabled={loading}
            placeholder="e.g., 1 semester, 6 months"
          />
          
          <Input
            label="Max Students"
            type="number"
            {...register('maxStudents', { valueAsNumber: true })}
            error={errors.maxStudents?.message}
            disabled={loading}
          />
          
          <Select
            label="Teacher (Optional)"
            {...register('teacherId')}
            error={errors.teacherId?.message}
            disabled={loading || loadingTeachers}
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.firstName} {teacher.lastName} ({teacher.subject})
              </option>
            ))}
          </Select>
          
          <Input
            label="Schedule (Optional)"
            {...register('schedule')}
            error={errors.schedule?.message}
            disabled={loading}
            placeholder="e.g., Mon/Wed/Fri 10:00-11:30"
          />
        </div>
        
        <Textarea
          label="Description (Optional)"
          {...register('description')}
          error={errors.description?.message}
          disabled={loading}
          rows={4}
          placeholder="Describe the course content and objectives..."
        />
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Course' : 'Create Course'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CourseForm;