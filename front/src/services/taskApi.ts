import { Task, CreateTaskRequest } from '../types/Task';

const API_BASE_URL = 'http://localhost:5242/tasks';

export const taskApi = {
  // Get all tasks
  async getTasks(): Promise<Task[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // Get task by ID
  async getTaskById(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  },

  // Create new task
  async createTask(task: CreateTaskRequest): Promise<Task> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    
    return response.json();
  },
}; 