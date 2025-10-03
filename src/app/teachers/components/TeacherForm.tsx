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
import { Teacher, TeacherFormData, teacherFormSchema } from '@/lib/schemas';

interface TeacherFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  teacher?: Teacher | null;
}

const TeacherForm: React.FC<TeacherFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  teacher
}) => {
  const [loading, setLoading] = useState(false);
  const isEditing = !!teacher;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherFormSchema)
  });

  useEffect(() => {
    if (teacher) {
      setValue('firstName', teacher.firstName);
      setValue('lastName', teacher.lastName);
      setValue('email', teacher.email);
      setValue('teacherId', teacher.teacherId);
      setValue('department', teacher.department);
      setValue('subject', teacher.subject);
      setValue('phoneNumber', teacher.phoneNumber || '');
      setValue('address', teacher.address || '');
    } else {
      reset();
    }
  }, [teacher, setValue, reset]);

  const onSubmit = async (data: TeacherFormData) => {
    setLoading(true);
    
    try {
      const url = isEditing ? `/api/teachers/${teacher._id}` : '/api/teachers';
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
            ? 'Teacher updated successfully!' 
            : 'Teacher created successfully!'
        );
        reset();
        onSuccess();
      } else {
        toast.error(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save teacher');
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
      title={isEditing ? 'Edit Teacher' : 'Add New Teacher'}
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
            label="Teacher ID"
            {...register('teacherId')}
            error={errors.teacherId?.message}
            disabled={loading}
          />
          
          <Input
            label="Department"
            {...register('department')}
            error={errors.department?.message}
            disabled={loading}
          />
          
          <Input
            label="Subject"
            {...register('subject')}
            error={errors.subject?.message}
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
              isEditing ? 'Update Teacher' : 'Create Teacher'
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TeacherForm;