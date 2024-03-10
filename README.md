<<<<<<< HEAD
# Node CRUD Project

This repository contains a simple yet functional CRUD (Create, Read, Update, Delete) application built with Node.js, Express, and MongoDB. The application features user registration and login functionality, secured with JWT authentication. Users can perform CRUD operations on their data. This project serves as a great starting point for anyone looking to understand how to implement basic CRUD operations and authentication in a Node.js application.

## Features

- User registration and login with JWT authentication
- CRUD operations for users

## Installation

1. Clone this repository:
   https://github.com/SaintsLuis/node_api_rest_mongo.git

2. Install the dependencies:
   npm install

3. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret, like this:
   DATABASE_URL=mongodb+srv://username:password@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   JWT_SECRET=yourjwtsecret

4. Start the server:
   npm run dev

## License

This project is licensed under the ISC License.
=======
# Book Management API

Una API RESTful para la gestión de libros, construida con Node.js, Express y MongoDB.

## Instalación

1. Clona el repositorio: `git clone https://github.com/SaintsLuis/node_api_rest_mongo.git`
2. Instala las dependencias: `npm install`
3. Inicia el servidor: `npm run dev`

## Uso

La API tiene las siguientes rutas:

- GET /books: Obtiene todos los libros
- GET /books/:id: Obtiene un libro por su id
- POST /books: Crea un nuevo libro
- PATCH /books/:id: Actualiza parcialmente un libro por su id
- PUT /books/:id: Actualiza completamente un libro por su id
- DELETE /books/:id: Elimina un libro por su id

## Variables de entorno

La aplicación utiliza las siguientes variables de entorno:

- `MONGO_URI`: La URI de tu base de datos MongoDB
- `MONGO_DB_NAME`: El nombre de tu base de datos MongoDB
- `MONGO_USER`: El nombre de usuario para tu base de datos MongoDB
- `MONGO_PASS`: La contraseña para tu base de datos MongoDB
- `PORT`: El puerto en el que se ejecutará el servidor
>>>>>>> a1e98d4e40e76d9ca971585d8870054dcc7fe0c0
