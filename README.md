# Book Management API

Una API RESTful para la gestión de libros, construida con Node.js, Express y MongoDB.

## Instalación

1. Clona el repositorio: `git clone https://github.com/yourusername/book-management-api.git`
2. Instala las dependencias: `npm install`
3. Inicia el servidor: `npm start`

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
