import React from 'react';
import { Task } from '../types/Task';

interface TaskTableProps {
  tasks: Task[];
  isLoading: boolean;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, isLoading }) => {
  if (isLoading) {
    return (
      <div className="task-table">
        <h2>Tasks</h2>
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-table">
        <h2>Tasks</h2>
        <div className="no-tasks">No tasks found. Create your first task above!</div>
      </div>
    );
  }

  return (
    <div className="task-table">
      <h2>Tasks ({tasks.length})</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="task-id">{task.id}</td>
              <td className="task-name">{task.name}</td>
              <td className="task-description">
                {task.description || <em>No description</em>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable; 