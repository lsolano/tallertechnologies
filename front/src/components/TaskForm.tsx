import React, { useState } from 'react';
import { CreateTaskRequest } from '../types/Task';

interface TaskFormProps {
  onSubmit: (task: CreateTaskRequest) => void;
  isLoading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CreateTaskRequest>({
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; description?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (formData.name.length < 10) {
      newErrors.name = 'Task name must be at least 10 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Task name must be less than 100 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', description: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="task-form">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Task Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter task name (10-100 characters)"
            disabled={isLoading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Enter task description (optional, max 1000 characters)"
            rows={3}
            disabled={isLoading}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm; 