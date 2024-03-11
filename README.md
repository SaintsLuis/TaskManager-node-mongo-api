## Task Manager

Task Manager is a simple yet functional CRUD (Create, Read, Update, Delete) API built with Node.js, Express, and MongoDB. The application features user registration and login functionality, secured with JWT authentication. Users can perform CRUD operations on their tasks.

## Features

- User registration and login with JWT authentication
- CRUD operations for tasks

## Technologies Used

✅ Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.

✅ Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

✅ MongoDB: A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

✅ Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

✅ JWT (JSON Web Tokens): A compact, URL-safe means of representing claims to be transferred between two parties. Used for securely transmitting information between parties as a JSON object.

## Installation

1. Clone this repository:
   https://github.com/SaintsLuis/TaskManager-node-mongo-api.git

2. Install the dependencies:
   npm install

3. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret, like this:
   DATABASE_URL=mongodb+srv://username:password@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   JWT_SECRET=yourjwtsecret

4. Start the server:
   npm run dev

## Author

Luis M Santos

## License

This project is licensed under the ISC License.
