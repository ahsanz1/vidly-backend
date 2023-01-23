## Introduction

This project is the backend of Vidly, an imaginary video rental app. The backend is developed
using NodeJS and MongoDB.

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running.

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Create .env Files

At the root of project folder, create .env and .env.test files. Create DATABASE_URL and
JWT_PRIVATE_KEY environment variables. DATABASE_URL is your mongoDB connection string and
JWT_PRIVATE_KEY is any random string used for verifying JWTs by jsonwebtoken package.

### Populate the Database

    npm run seed

### Run the Tests

You're almost done! Run the tests to make sure everything is working:

    npm test

All tests should pass.

### Start the Development Server

    npm run dev

This will launch the Node server on port 3000.

Open up your browser and head over to:

http://localhost:3000/api/genres

You should see the list of genres. That confirms that you have set up everything successfully.

### Postman Collection

You can use this postman collection to try out the Vidly app endpoints.

    https://fabricteam.postman.co/workspace/Ahsan's-Workspace~3acd2733-0cf8-4b81-b936-5296480bd714/collection/12105681-69897b8a-817b-431b-9edc-9135f84e82fb?action=share&creator=12105681
