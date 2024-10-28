import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    status: '',
    priority: '',
    assignedTo: ''
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_API}/tasks`, task);
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} />
      <textarea name="description" onChange={handleChange} />
      <input type="date" name="dueDate" onChange={handleChange} />
      <select name="status" onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
      <select name="priority" onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="text" name="assignedTo" onChange={handleChange} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
