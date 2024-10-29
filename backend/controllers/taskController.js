const db = require('../config/db');

// Get all tasks
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

// Create a new task
exports.createTask = (req, res) => {
  const { name, description, dueDate, status, priority, assignedTo } = req.body;

  // Validate required fields
  if (!name || !description || !dueDate || !status || !priority) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  db.query(
    'INSERT INTO tasks (name, description, dueDate, status, priority, assignedTo) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, dueDate, status, priority, assignedTo],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
};

// Update a task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { status, priority, assignedTo } = req.body;

  db.query(
    'UPDATE tasks SET status = ?, priority = ?, assignedTo = ? WHERE id = ?',
    [status, priority, assignedTo, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
};

// Delete a task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Task deleted' });
  });
};
