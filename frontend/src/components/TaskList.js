import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async (id, updatedStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: updatedStatus });
      fetchTasks();  
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className="task-item">
          <span className="task-name">{task.name}</span>
          <span className="task-priority">Priority: {task.priority}</span>
          <button onClick={() => handleUpdate(task.id, task.status === 'Pending' ? 'Completed' : 'Pending')}>
            {task.status === 'Pending' ? 'Mark Completed' : 'Mark Pending'}
          </button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
