import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import { Task, CreateTaskRequest } from './types/Task';
import { taskApi } from './services/taskApi';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please check if the API server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    setIsCreating(true);
    setError(null);
    
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tasks Management</h1>
        <p>Organize your tasks with ease</p>
      </header>
      
      <main className="App-main">
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
        
        <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
        <TaskTable tasks={tasks} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
