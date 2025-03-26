const request = require('supertest');
const app = require('../src/app');
const { pool ,query} = require('../src/db');

describe('Todo API Endpoints', () => {
  beforeAll(async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS task (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
  });

  afterEach(async () => {
    await pool.query('DELETE FROM task');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({
          title: 'Test Task',
          description: 'Test Description'
        });
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
    });

    it('should reject tasks without title', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ description: 'No title' });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /tasks', () => {
    it('should retrieve tasks', async () => {
      await query(
        'INSERT INTO task (title, description) VALUES ($1, $2)',
        ['Test Task', 'Test Description']
      );

      const response = await request(app).get('/tasks');
      
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].title).toBe('Test Task');
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should mark task as completed', async () => {
      const insertResult = await query(
        'INSERT INTO task (title) VALUES ($1) RETURNING id',
        ['Task to complete']
      );
      const taskId = insertResult.rows[0].id;

      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .send({ completed: true });
      
      expect(response.statusCode).toBe(200);
      expect(response.body.completed).toBe(true);
    });
  });
});