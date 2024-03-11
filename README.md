# T

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
