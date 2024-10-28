import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get(`${process.env.REACT_API}/tasks`);
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
};

export default TaskList;
