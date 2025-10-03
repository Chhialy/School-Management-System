'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/modal';
import { LoadingSpinner } from '@/components/ui/loading';
import { Student, StudentFormData, studentFormSchema } from '@/lib/schemas';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  student?: Student | null;
}

const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  student
}) => {
  const [loading, setLoading] = useState(false);
  const isEditing = !!student;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema)
  });

  useEffect(() => {
    if (student) {
      setValue('firstName', student.firstName);
      setValue('lastName', student.lastName);
      setValue('email', student.email);
      setValue('studentId', student.studentId);
      setValue('grade', student.grade);
      setValue('dateOfBirth', student.dateOfBirth);
      setValue('phoneNumber', student.phoneNumber || '');
      setValue('address', student.address || '');
    } else {
      reset();
    }
  }, [student, setValue, reset]);

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);
    
    try {
      const url = isEditing ? `/api/students/${student._id}` : '/api/students';
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
            ? 'Student updated successfully!' 
            : 'Student created successfully!'
        );
        reset();
        onSuccess();
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save student');
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
      title={isEditing ? 'Edit Student' : 'Add New Student'}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="First Name"
            {...register('firstName')}
            error={errors.firstName?.message}
            disabled={loading}
          />
          
          <Input
            label="Last Name"
            {...register('lastName')}
            error={errors.lastName?.message}
            disabled={loading}
          />
          
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            disabled={loading}
          />
          
          <Input
            label="Student ID"
            {...register('studentId')}
            error={errors.studentId?.message}
            disabled={loading}
          />
          
          <Input
            label="Grade"
            {...register('grade')}
            error={errors.grade?.message}
            disabled={loading}
          />
          
          <Input
            label="Date of Birth"
            type="date"
            {...register('dateOfBirth')}
            error={errors.dateOfBirth?.message}
            disabled={loading}
          />
          
          <Input
            label="Phone Number (Optional)"
            {...register('phoneNumber')}
            error={errors.phoneNumber?.message}
            disabled={loading}
          />
        </div>
        
        <Textarea
          label="Address (Optional)"
          {...register('address')}
          error={errors.address?.message}
          disabled={loading}
          rows={3}
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
              isEditing ? 'Update Student' : 'Create Student'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentForm;