# Assignment Submission Portal Backend

A TypeScript-based backend system for managing assignment submissions between users and admins. The system provides secure authentication, role-based access control, and comprehensive assignment management functionality.

## 🚀 Features

- **User Management**
  - User and admin registration
  - Secure authentication using JWT
  - Role-based access control
  - Password encryption

- **Assignment Management**
  - Assignment submission by users
  - Assignment review by admins
  - Status tracking (pending/accepted/rejected)
  - Timestamp tracking

- **Security**
  - JWT-based authentication
  - Password hashing using bcrypt
  - Input validation
  - Role-based middleware protection

## 🛠️ Technical Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator

## 📋 Prerequisites

- Node.js
- MongoDB
- npm or yarn package manager
- TypeScript

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/assignment-portal
   JWT_SECRET=your-secret-key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## 🔍 API Documentation

### Authentication Endpoints

#### Register User/Admin
```http
POST /api/v1/register
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "role": "user" | "admin"
}
```

#### Login
```http
POST /api/v1/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

### Assignment Endpoints

#### Get All Admins
```http
GET /api/v1/admins
Authorization: Bearer <token>
```

#### Upload Assignment
```http
POST /api/v1/upload
Authorization: Bearer <token>
Content-Type: application/json

{
  "task": "string",
  "admin": "adminId"
}
```

#### Get Assignments (Admin Only)
```http
GET /api/v1/assignments
Authorization: Bearer <token>
```

#### Accept Assignment
```http
POST /api/v1/assignments/:id/accept
Authorization: Bearer <token>
```

#### Reject Assignment
```http
POST /api/v1/assignments/:id/reject
Authorization: Bearer <token>
```

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Obtain a token through registration or login
2. Include the token in the cookies:
   ```
   token: Bearer <your-token>
   ```

## 📦 Project Structure

```
src/
├── types/
│   └── index.ts           # TypeScript interfaces
├── models/
│   ├── user.model.ts      # User schema and model
│   └── assignment.model.ts # Assignment schema and model
├── middleware/
│   └── auth.middleware.ts # Authentication middleware
├── routes/
│   ├── auth.route.ts     # Authentication routes
│   └── assignment.route.ts# Assignment routes
└── index.ts                 # Main application file
```

## 💻 Development

1. **Run in development mode**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

The application can be configured using the following environment variables:

- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## 🛡️ Security Considerations

1. **Password Storage**
   - Passwords are hashed using bcrypt
   - Salt rounds are configurable

2. **API Security**
   - Input validation on all endpoints
   - Role-based access control
   - JWT token expiration

3. **Error Handling**
   - Safe error messages
   - No sensitive data in responses
   - Proper HTTP status codes

## 🐞 Error Handling

The API uses standard HTTP status codes:

- `200`: Success
- `201`: Resource created
- `400`: Bad request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not found
- `500`: Server error


