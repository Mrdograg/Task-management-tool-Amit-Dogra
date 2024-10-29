import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Low',
    assignedTo: ''
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', task);
      fetchTasks();  
      setTask({
        name: '',
        description: '',
        dueDate: '',
        status: 'Pending',
        priority: 'Low',
        assignedTo: ''
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Task Name" value={task.name} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={task.description} onChange={handleChange} />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="text" name="assignedTo" placeholder="Assign to" value={task.assignedTo} onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
