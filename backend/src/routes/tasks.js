const express = require('express');
const router = express.Router();
const { query } = require('../db');

router.get('/', async (req, res) => {
    try {
      const result = await query(
        'SELECT * FROM task WHERE completed = false ORDER BY created_at DESC LIMIT 5'
      );
      res.json(result.rows);
    } catch (err) {
      
      res.status(500).json({ error: 'Internal server error', details: err.message 
      });
    }
  });
  
  router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    try {
      const result = await query(
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
  
  router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await query(
        'UPDATE task SET completed = true WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rowCount === 0) return res.status(404).json({ error: 'Task not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
  
    try {
      const result = await query(
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
  
  module.exports = router;
