# Voting System Backend

## Overview

This is the backend service for the Voting System application. The backend is built using Node.js, Express.js, and Prisma for database interaction. The service provides RESTful api/v1s to manage user votes, topics, options, and administrative functions. It handles the logic for voting, ensuring users can vote only once per topic, and manages the aggregation of votes.

## Features

- User Authentication and Authorization
- CRUD operations for Topics and Options
- Voting functionality with a constraint on one vote per user per topic
- Admin functionalities for managing topics and users
- Database management using Prisma ORM
- Error handling and logging

## Directory Structure

```
├── dev_setup_mysql.sql
├── package.json
├── package-lock.json
├── prisma
│   ├── migrations
│   │   ├── 20240821195017_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
└── src
    ├── app.js
    ├── controllers
    │   ├── option.controller.js
    │   ├── topic.controller.js
    │   ├── user.controller.js
    │   └── vote.controller.js
    ├── middlewares
    │   ├── auth.admin.js
    │   ├── auth.user.js
    │   ├── prisma.middleware.js
    │   ├── req.body.validation.js
    │   ├── validate.session.js
    │   ├── validate.topic.js
    │   └── validate.user.js
    ├── models
    │   ├── client.db.js
    │   ├── option.dao.js
    │   ├── topic.dao.js
    │   ├── user.dao.js
    │   └── vote.dao.js
    ├── routes
    │   ├── index.js
    │   ├── option.route.js
    │   ├── topic.routes.js
    │   ├── user.routes.js
    │   └── vote.route.js
    ├── utils
    │   └── auth.js
    └── validations
        ├── topic.validation.js
        └── user.validation.js
```

## Prerequisites

- **Node.js**: v14 or above
- **npm**: v6 or above
- **MySQL**: The application uses MySQL as the database. Ensure you have MySQL installed and running.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sallmahussien/voting-system.git
   cd voting-system/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create database schema**
    ```bash
    cat dev_setup_mysql.sql | mysql -u root -p
    ```

4. **Set up environment variables**:
   Create a `.env` file in the root of the `backend` directory and add the following variables:

   ```bash
   DATABASE_URL="mysql://VS:VS_pwd@localhost:3306/VotingSystem"
   PORT=8000
   JWT_SECRET=your_jwt_secret_key
   HASHING_SECRET="VOTINGSYSTEM"
   ```

5. **Set up the database**:
   - Run Prisma migrations to set up the database schema:
     ```bash
     npx prisma migrate dev
     ```
   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```

5. **Start the server**:
   ```bash
   npm run dev
   ```

   The server will start running on `http://localhost:8000`.

## API Documentation

### Authentication

- **POST** `/api/v1/auth/signup` - Register a new user
- **POST** `/api/v1/auth/login` - Authenticate a user and return a JWT

### Topics

- **POST** `/api/v1/topics` - Create a new topic (Admin only)
 
- **GET** `/api/v1/topics/:topicId` - Get a topic by Id
- **GET** `/api/v1/topics/active` - Get all active topics
- **GET** `/api/v1/topics/recent-finished` - Get all active topics
- **GET** `/api/v1/topics/coming-soon` - Get all comming soon topics
- **GET** `/api/v1/topics/sorted` - Get all topics sorted by start_date
- **GET** `/api/v1/topics/postpone` - Get all topics to be postponed (Admin only)
- **GET** `/api/v1/topics/extend` - Get all topics to be extend (Admin only)
- **GET** `/api/v1/topics/cancel` - Get all to be topics (Admin only)

- **PUT** `/api/v1/topics/:topicId/postpone` - Postpone a topic (Admin only)
- **PUT** `/api/v1/topics/:topicId/extend` - Extend a topic (Admin only)
- **PUT** `/api/v1/topics/:topicId/cancel` - Cancel a topic (Admin only)


### Options

- **GET** `/api/v1/topics/:topicId/options` - Get all options for a topic

### Voting

- **POST** `/api/v1/options/:optionId/vote` - Vote for an option (Users can vote only once per topic)

## Error Handling

- All endpoints return appropriate HTTP status codes and error messages in case of failure.
- Errors are logged to the console for debugging purposes.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.
