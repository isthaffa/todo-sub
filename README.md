# Todo Application

A full-stack todo application built with React, Node.js, and PostgreSQL.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-sub
```

2. Start the application:
```bash
docker-compose up --build
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:5001
- PostgreSQL database on localhost:5432

## Accessing the Application

1. Open your web browser and navigate to http://localhost:3000 to access the frontend UI
2. The backend API will be available at http://localhost:5001
3. The database will be accessible on localhost:5432

## Development

- Frontend hot-reloading is enabled - any changes to the frontend code will automatically refresh the browser
- Backend hot-reloading is enabled - any changes to the backend code will automatically restart the server
- Database data persists between container restarts

## Stopping the Application

To stop the application:
```bash
docker-compose down
```

To stop the application and remove all data (including the database):
```bash
docker-compose down -v
```

## Environment Variables

The application uses the following environment variables:

### Backend
- `NODE_ENV`: development
- `DB_HOST`: db
- `DB_PORT`: 5432
- `DB_USER`: postgres
- `DB_PASSWORD`: postgres
- `DB_NAME`: todo_db
- `PORT`: 5001

### Frontend
- `REACT_APP_API_URL`: http://localhost:5001

## Database

The PostgreSQL database is initialized with a `task` table that has the following schema:
- id (SERIAL PRIMARY KEY)
- title (VARCHAR(255))
- description (TEXT)
- completed (BOOLEAN)
- created_at (TIMESTAMP)

