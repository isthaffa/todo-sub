# TODO

Brief description of your project goes here.

## Prerequisites

- Docker
- Docker Compose (if using docker-compose)

## Getting Started

### Building the Docker Image

```bash
docker build -t todo-sub .
```

### Running the Container

```bash
docker run -p 3000:3000 todo-sub
```

Or if using docker-compose:

```bash
docker-compose up
```

The application will be available at `http://localhost:3000`

## Development

To run the container in development mode with hot-reloading:

```bash
docker-compose -f docker-compose.dev.yml up
```

## Stopping the Container

```bash
docker-compose down
```

## License

[Your chosen license]
