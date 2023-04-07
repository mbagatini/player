# API

## Software architecture

The development of this project is guided by [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

## Development

### Requirements

The development enviroment must have installed:

- NodeJS
- Docker

### Run the application locally

The application makes use of PostgreSQL database to store it's information. In order to be easier to run the application, it uses Docker to create the database container.

1. Edit the `docker-compose.yml` file with the desired configuration.
2. Create a `.env` file with the attributes from `.env.example` that matches `docker-compose.yml`
3. Build docker container to serve the PostgreSQL database with `docker compose up -d pg `
4. Install NPM libraries with `npm install`
5. Run the database migrations with `npx prisma migrate dev`
6. Start the application with `npm run dev`

The server will start on port 3333.
