export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface CreateTaskRequest {
  name: string;
  description: string;
} 