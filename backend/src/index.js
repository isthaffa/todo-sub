require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM task WHERE completed = false ORDER BY created_at DESC LIMIT 5'
    );
    res.json(result.rows);
  } catch (err) {
    
    res.status(500).json({ error: 'Internal server error', details: err.message 
    });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const result = await pool.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {

    res.status(500).json({ error: 'Internal server error' ,
      details: err.message 

    });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE task SET completed = true WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));