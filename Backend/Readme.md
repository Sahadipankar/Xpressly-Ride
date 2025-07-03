# 🚀 Xpressly Backend API Documentation

> **🌟 Comprehensive RESTful API for the Xpressly ride-sharing platform**

This document provides detailed information about all API endpoints, authentication mechanisms, data structures, and integration guidelines for the Xpressly backend service. Built with Node.js, Express.js, and MongoDB, this API powers real-time ride booking, user management, and location services.

## 📋 **Quick Navigation**

- [🚀 Xpressly Backend API Documentation](#-xpressly-backend-api-documentation)
  - [📋 Quick Navigation](#-quick-navigation)
  - [🎯 API Overview](#-api-overview)
  - [🔐 Authentication System](#-authentication-system)
  - [📊 Data Models & Schemas](#-data-models--schemas)
  - [👤 User Management APIs](#-user-management-apis)
  - [👨‍✈️ Captain Management APIs](#-captain-management-apis)
  - [🚗 Ride Management APIs](#-ride-management-apis)
  - [🗺️ Maps & Location APIs](#-maps--location-apis)
  - [📡 Socket.IO Events](#-socketio-events)
  - [❌ Error Handling](#-error-handling)
  - [🧪 Testing & Examples](#-testing--examples)
  - [🚀 Deployment Guide](#-deployment-guide)

---

## 🎯 **API Overview**

### 🏗️ **Architecture & Design**
- **🔧 Framework**: Express.js with RESTful design principles
- **🗃️ Database**: MongoDB with Mongoose ODM
- **🔐 Authentication**: JWT-based stateless authentication
- **📡 Real-time**: Socket.IO for live communication
- **🗺️ External APIs**: Google Maps Platform integration
- **✅ Validation**: express-validator middleware

[⬅️ Back to Quick Navigation](#-quick-navigation)

### 🌐 **Base URL & Endpoints**
```
Production:  https://your-backend-domain.render.com
Development: http://localhost:4000

API Format:  /api/v1/{resource}/{action}
```

### 📊 **Response Format**
All API responses follow a consistent structure:
```json
{
  "success": true | false,
  "message": "Human readable message",
  "data": { /* Response data */ },
  "error": { /* Error details (if applicable) */ }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 🔐 **Authentication System**

### 🎫 **JWT Token Implementation**
- **🔒 Algorithm**: HS256 (HMAC SHA-256)
- **⏰ Expiration**: 24 hours (configurable)
- **📍 Location**: Authorization header as Bearer token
- **🚫 Blacklisting**: Token invalidation on logout

### 🛡️ **Authentication Middleware**
```javascript
// Authentication required for protected routes
headers: {
  'Authorization': 'Bearer <your-jwt-token>',
  'Content-Type': 'application/json'
}
```

### 🔄 **Token Lifecycle**
1. **🎯 Generation**: Created on successful login/registration
2. **📤 Usage**: Included in all protected route requests
3. **✅ Validation**: Verified on each protected route access
4. **🚫 Invalidation**: Blacklisted on logout

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 📊 **Data Models & Schemas**

### 👤 **User Schema**
```javascript
{
  _id: ObjectId,
  fullname: {
    firstname: String (min: 3, required),
    lastname: String (min: 3, optional)
  },
  email: String (unique, required, validated),
  password: String (hashed with bcrypt),
  socketId: String (for real-time communication),
  createdAt: Date,
  updatedAt: Date
}
```

### 👨‍✈️ **Captain Schema**
```javascript
{
  _id: ObjectId,
  fullname: {
    firstname: String (min: 3, required),
    lastname: String (min: 3, optional)
  },
  email: String (unique, required, validated),
  password: String (hashed with bcrypt),
  socketId: String,
  status: String (enum: ['active', 'inactive']),
  vehicle: {
    color: String (min: 3, required),
    plate: String (min: 3, required),
    capacity: Number (min: 1, required),
    vehicleType: String (enum: ['Car', 'Bike', 'Auto'])
  },
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 🚗 **Ride Schema**
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User'),
  captain: ObjectId (ref: 'Captain'),
  pickup: String (required),
  destination: String (required),
  fare: Number (calculated),
  status: String (enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled']),
  duration: Number (in minutes),
  distance: Number (in kilometers),
  paymentID: String,
  orderId: String,
  signature: String,
  otp: String (6 digits),
  createdAt: Date,
  updatedAt: Date
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 👤 **User Management APIs**

### 📝 **User Registration**

#### **Endpoint**: `POST /users/register`

**🎯 Purpose**: Creates a new user account with secure password hashing and automatic JWT token generation.

**🔧 Implementation Details**:
- Password hashing using bcrypt with salt rounds
- Email uniqueness validation
- Automatic JWT token generation
- Input sanitization and validation

**📥 Request Body**:
```json
{
  "fullname": {
    "firstname": "John",      // String, min 3 chars, required
    "lastname": "Doe"         // String, min 3 chars, optional
  },
  "email": "john.doe@example.com",  // Valid email format, required
  "password": "securePassword123"   // String, min 6 chars, required
}
```

**📤 Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**❌ Error Responses**:
```json
// 400 Bad Request - Validation Error
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}

// 409 Conflict - User Already Exists
{
  "success": false,
  "message": "User already exists with this email"
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🔑 **User Login**

#### **Endpoint**: `POST /users/login`

**🎯 Purpose**: Authenticates existing user credentials and returns JWT token for session management.

**🔧 Implementation Details**:
- bcrypt password comparison
- JWT token generation with user ID
- Login attempt logging
- Session management

**📥 Request Body**:
```json
{
  "email": "john.doe@example.com",    // Valid email, required
  "password": "securePassword123"     // String, min 6 chars, required
}
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
}
```

**❌ Error Responses**:
```json
// 401 Unauthorized - Invalid Credentials
{
  "success": false,
  "message": "Invalid email or password"
}

// 400 Bad Request - Validation Error
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Please fill a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 👤 **User Profile**

#### **Endpoint**: `GET /users/profile`

**🎯 Purpose**: Retrieves the authenticated user's profile information.

**🔧 Implementation Details**:
- JWT token validation required
- User data sanitization (password excluded)
- Profile completeness check

**🔒 Authentication**: Required (Bearer token)

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "socketId": null
    }
  }
}
```

**❌ Error Responses**:
```json
// 401 Unauthorized - Invalid/Missing Token
{
  "success": false,
  "message": "Access denied. No token provided."
}

// 404 Not Found - User Not Found
{
  "success": false,
  "message": "User not found"
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🚪 **User Logout**

#### **Endpoint**: `GET /users/logout`

**🎯 Purpose**: Securely logs out user by blacklisting the JWT token and clearing cookies.

**🔧 Implementation Details**:
- Token blacklisting for security
- Cookie clearing
- Session cleanup
- Socket disconnection

**🔒 Authentication**: Required (Bearer token)

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 👨‍✈️ **Captain Management APIs**

### 📝 **Captain Registration**

#### **Endpoint**: `POST /captains/register`

**🎯 Purpose**: Registers a new captain (driver) with vehicle information and creates authentication session.

**🔧 Implementation Details**:
- Vehicle information validation
- Driver license verification (future enhancement)
- Background check integration (future enhancement)
- Comprehensive captain profile creation

**📥 Request Body**:
```json
{
  "fullname": {
    "firstname": "Jane",        // String, min 3 chars, required
    "lastname": "Smith"         // String, min 3 chars, optional
  },
  "email": "jane.smith@example.com",  // Valid email, required
  "password": "securePassword123",    // String, min 6 chars, required
  "vehicle": {
    "color": "Red",            // String, min 3 chars, required
    "plate": "ABC123",         // String, min 3 chars, required
    "capacity": 4,             // Number, min 1, required
    "vehicleType": "Car"       // Enum: ['Car', 'Bike', 'Auto'], required
  }
}
```

**📤 Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Captain registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "status": "inactive",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "Car"
      },
      "location": {
        "lat": null,
        "lng": null
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**❌ Error Responses**:
```json
// 400 Bad Request - Validation Error
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Vehicle type must be Car, Bike, or Auto",
      "param": "vehicle.vehicleType",
      "location": "body"
    }
  ]
}

// 409 Conflict - Captain Already Exists
{
  "success": false,
  "message": "Captain already exists with this email"
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🔑 **Captain Login**

#### **Endpoint**: `POST /captains/login`

**🎯 Purpose**: Authenticates captain credentials and provides access to driver dashboard.

**📥 Request Body**:
```json
{
  "email": "jane.smith@example.com",
  "password": "securePassword123"
}
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Captain login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "status": "active",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "Car"
      },
      "location": {
        "lat": 28.6139,
        "lng": 77.2090
      }
    }
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 👨‍✈️ **Captain Profile**

#### **Endpoint**: `GET /captains/profile`

**🎯 Purpose**: Retrieves authenticated captain's profile with vehicle and location information.

**🔒 Authentication**: Required (Bearer token)

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Captain profile retrieved successfully",
  "data": {
    "captain": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "status": "active",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "Car"
      },
      "location": {
        "lat": 28.6139,
        "lng": 77.2090
      },
      "earnings": {
        "today": 250,
        "thisWeek": 1750,
        "thisMonth": 7500
      }
    }
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🚪 **Captain Logout**

#### **Endpoint**: `GET /captains/logout`

**🎯 Purpose**: Logs out captain, updates status to inactive, and clears session.

**🔧 Implementation Details**:
- Sets captain status to 'inactive'
- Clears location data
- Blacklists JWT token
- Disconnects from Socket.IO

**🔒 Authentication**: Required (Bearer token)

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Captain logged out successfully"
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

---

# Backend API Documentation (User Register)

## Description
Creates a new user account and returns a JWT token along with user data.

---

## HTTP Method
**POST** `/user/register`

---

## Required Packages
Below are the main packages involved in this endpoint:

1. **express** – Used to handle HTTP requests and responses.  
2. **express-validator** – Used for validating incoming request data (e.g., checking email format).  
3. **mongoose** – Object Data Modeling (ODM) library for MongoDB.  
4. **bcrypt** – Handles password hashing.  
5. **jsonwebtoken** – Generates JSON Web Tokens for authentication.  

---

## Controller File: `user.controller.js`
- **userRegister(req, res, next)**  
  - Validates request data using `express-validator`.  
  - Extracts `fullname`, `email`, and `password` from `req.body`.  
  - Hashes the password using the static `hashPassword` method from `user.model.js`.  
  - Calls `userService.createUser`, passing the hashed password and user details.  
  - Generates a JWT token using the `generateAuthToken` method from the created user instance.  
  - Responds with a **201** status code, returning the `token` and `user` object.

---

## Service File: `user.service.js`
- **createUser({ firstname, lastname, email, password })**  
  - Verifies that all required fields exist (`firstname`, `email`, `password`).  
  - Creates a new user record in MongoDB by calling `userModel.create()`.  
  - Returns the created user document.

---

## Model File: `user.model.js`
- **userSchema**  
  - Defines fields: `fullname.firstname`, `fullname.lastname`, `email`, `password`, and an optional `socketId`.  
- **userSchema.methods.generateAuthToken()**  
  - Generates a JWT token containing the user’s `_id` using `jsonwebtoken`.  
- **userSchema.methods.comparePassword(password)**  
  - Compares a given plaintext password with the stored hashed password using `bcrypt`.  
- **userSchema.statics.hashPassword(password)**  
  - Hashes a plaintext password using `bcrypt`.

---

## Request Body
```json
{
  "fullname": {
    "firstname": "string (≥3 chars, required)",
    "lastname": "string (≥3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (≥6 chars, required)"
}
```

---

## Status Codes & Responses

1. **201 Created**  
   Example Successful Response:
   ```json
   {
     "token": "generated-jwt-token",
     "user": {
       "_id": "user-id-string",
       "fullname": {
         "firstname": "John",
         "lastname": "Doe"
       },
       "email": "johndoe@example.com",
       "password": "hashed-password",
       "socketId": null
     }
   }
   ```

2. **400 Bad Request**  
   Returned if validation fails or required fields are missing. Example Error Response:
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (User Login)

## Description
Authenticates an existing user by verifying the provided email and password. On success, returns a JWT token plus the user data.

---

## HTTP Method
**POST** `/user/login`

---

## Request Body
```json
{
  "email": "string (valid email, required)",
  "password": "string (≥6 chars, required)"
}
```

---

## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "token": "generated-jwt-token",
     "user": {
       "_id": "user-id-string",
       "fullname": {
         "firstname": "John",
         "lastname": "Doe"
       },
       "email": "johndoe@example.com",
       "password": "hashed-password",
       "socketId": null
     }
   }
   ```

2. **400 Bad Request**  
   Returned if validation fails. Example Error Response:
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```

3. **401 Unauthorized**  
   Returned if the credentials are invalid. Example Error Response:
   ```json
   {
     "message": "Invalid email or password"
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (User Profile)

## Description
Retrieves the profile of the currently authenticated user.

---

## HTTP Method
**GET** `/user/profile`

---

## Request Body
*None.*

---

[⬅️ Back to Table of Contents](#table-of-contents)

---


## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "_id": "user-id-string",
     "fullname": {
       "firstname": "John",
       "lastname": "Doe"
     },
     "email": "johndoe@example.com",
     "socketId": null
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---


# Backend API Documentation (User Logout)

## Description
Logs out the currently authenticated user by clearing the token cookie and blacklisting the token.

---

## HTTP Method
**GET** `/user/logout`

---

## Request Body
*None.*

---

## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "message": "Logged out successfully"
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (Captain Register)

## Description
Creates a new captain account (driver) and returns a JWT token along with captain data. This endpoint is used for registering captains who will drive vehicles in the system. It validates all required fields, including vehicle details.

---

## HTTP Method
**POST** `/captains/register`

---

## Required Packages
Below are the main packages involved in this endpoint:

1. **express** – Used to handle HTTP requests and responses.  
2. **express-validator** – Used for validating incoming request data (e.g., checking email format, vehicle details).  
3. **mongoose** – Object Data Modeling (ODM) library for MongoDB.  
4. **bcrypt** – Handles password hashing.  
5. **jsonwebtoken** – Generates JSON Web Tokens for authentication.  

---

## Controller File: `captain.controller.js`
- **registerCatain(req, res)**  
  - Validates request data using `express-validator`.  
  - Checks if a captain with the same email already exists.  
  - Hashes the password using the static `hashPassword` method from `captain.model.js`.  
  - Calls `captainService.createCaptain`, passing the hashed password and all required details.  
  - Generates a JWT token using the `generateAuthToken` method from the created captain instance.  
  - Responds with a **201** status code, returning the `token` and `captain` object.

---

## Service File: `captain.service.js`
- **createCaptain({ firstname, lastname, email, password, color, plate, capacity, vehicleType })**  
  - Verifies that all required fields exist.  
  - Creates a new captain record in MongoDB by calling `captainModel.create()`.  
  - Returns the created captain document.

---

## Model File: `captain.model.js`
- **captainSchema**  
  - Defines fields: `fullname.firstname`, `fullname.lastname`, `email`, `password`, `socketId`, `status`, `vehicle` (with `color`, `plate`, `capacity`, `vehicleType`), and `location`.  
- **captainSchema.methods.generateAuthToken()**  
  - Generates a JWT token containing the captain’s `_id` using `jsonwebtoken`.  
- **captainSchema.methods.comparePassword(password)**  
  - Compares a given plaintext password with the stored hashed password using `bcrypt`.  
- **captainSchema.statics.hashPassword(password)**  
  - Hashes a plaintext password using `bcrypt`.

---

## Request Body
```json
{
  "fullname": {
    "firstname": "string (≥3 chars, required)",
    "lastname": "string (≥3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (≥6 chars, required)",
  "vehicle": {
    "color": "string (≥3 chars, required)",
    "plate": "string (≥3 chars, required)",
    "capacity": "number (≥1, required)",
    "vehicleType": "string (Car | Bike | Auto, required)"
  }
}
```

---

## Status Codes & Responses

1. **201 Created**  
   Example Successful Response:
   ```json
   {
     "token": "generated-jwt-token",
     "captain": {
       "_id": "captain-id-string",
       "fullname": {
         "firstname": "Jane",
         "lastname": "Smith"
       },
       "email": "janesmith@example.com",
       "socketId": null,
       "status": "inactive",
       "vehicle": {
         "color": "Red",
         "plate": "ABC123",
         "capacity": 4,
         "vehicleType": "Car"
       },
       "location": {
         "lat": null,
         "lng": null
       }
     }
   }
   ```

2. **400 Bad Request**  
   Returned if validation fails or required fields are missing. Example Error Response:
   ```json
   {
     "errors": [
       {
         "msg": "Please fill a valid email address",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```
   Or if the captain already exists:
   ```json
   {
     "message": "Captain already exists"
   }
   ```

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (Captain Login)

## Description
Authenticates an existing captain by verifying the provided email and password. On success, returns a JWT token plus the captain data.

---

## HTTP Method
**POST** `/captains/login`

---

## Request Body
```json
{
  "email": "string (valid email, required)",
  "password": "string (≥6 chars, required)"
}
```

---

## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "token": "generated-jwt-token",
     "captain": {
       "_id": "captain-id-string",
       "fullname": {
         "firstname": "Jane",
         "lastname": "Smith"
       },
       "email": "janesmith@example.com",
       "socketId": null,
       "status": "inactive",
       "vehicle": {
         "color": "Red",
         "plate": "ABC123",
         "capacity": 4,
         "vehicleType": "Car"
       },
       "location": {
         "lat": null,
         "lng": null
       }
     }
   }
   ```

2. **400 Bad Request**  
   Returned if validation fails or credentials are incorrect. Example Error Response:
   ```json
   {
     "errors": [
       {
         "msg": "Please fill a valid email address",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```
   Or:
   ```json
   {
     "message": "Invalid email or password"
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (Captain Profile)

## Description
Retrieves the profile of the currently authenticated captain.

---

## HTTP Method
**GET** `/captains/profile`

---

## Request Body
*None.*

---

## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "captain": {
       "_id": "captain-id-string",
       "fullname": {
         "firstname": "Jane",
         "lastname": "Smith"
       },
       "email": "janesmith@example.com",
       "socketId": null,
       "status": "inactive",
       "vehicle": {
         "color": "Red",
         "plate": "ABC123",
         "capacity": 4,
         "vehicleType": "Car"
       },
       "location": {
         "lat": null,
         "lng": null
       }
     }
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (Captain Logout)

## Description
Logs out the currently authenticated captain by clearing the token cookie and blacklisting the token.

---

## HTTP Method
**GET** `/captains/logout`

---

## Request Body
*None.*

---

## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "message": "Logged out successfully"
   }
   ```

---

## 🚗 **Ride Management APIs**

### 🎯 **Create Ride Request**

#### **Endpoint**: `POST /rides/create`

**🎯 Purpose**: Creates a new ride request and initiates the captain matching process.

**🔧 Implementation Details**:
- Fare calculation using Google Distance Matrix API
- OTP generation for ride verification
- Captain matching algorithm based on proximity
- Real-time notifications to nearby captains

**🔒 Authentication**: Required (Bearer token - User only)

**📥 Request Body**:
```json
{
  "pickup": "123 Main St, New York, NY",      // String, min 3 chars, required
  "destination": "456 Oak Ave, New York, NY", // String, min 3 chars, required
  "vehicleType": "Car"                        // Enum: ['Auto', 'Car', 'Moto'], required
}
```

**📤 Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Ride created successfully",
  "data": {
    "ride": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "user": "60f7b3b3b3b3b3b3b3b3b3b1",
      "pickup": "123 Main St, New York, NY",
      "destination": "456 Oak Ave, New York, NY",
      "vehicleType": "Car",
      "fare": 127,
      "distance": "8.5 km",
      "duration": "22 mins",
      "status": "pending",
      "otp": "123456",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

**❌ Error Responses**:
```json
// 400 Bad Request - Invalid Address
{
  "success": false,
  "message": "Invalid pickup or destination address"
}

// 422 Unprocessable Entity - Validation Error
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Invalid pickup address",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 💰 **Get Fare Estimation**

#### **Endpoint**: `GET /rides/get-fare`

**🎯 Purpose**: Calculates estimated fare for different vehicle types based on pickup and destination.

**🔧 Implementation Details**:
- Google Distance Matrix API integration
- Dynamic pricing based on distance and vehicle type
- Real-time traffic consideration
- Surge pricing during peak hours (future enhancement)

**🔒 Authentication**: Required (Bearer token)

**📥 Query Parameters**:
```
pickup=123%20Main%20St,%20New%20York,%20NY
destination=456%20Oak%20Ave,%20New%20York,%20NY
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Fare calculated successfully",
  "data": {
    "distance": "8.5 km",
    "duration": "22 mins",
    "fares": {
      "Auto": {
        "fare": 85,
        "baseRate": "₹10/km",
        "description": "Compact and economical option"
      },
      "Car": {
        "fare": 127,
        "baseRate": "₹15/km", 
        "description": "Comfortable 4-seater ride"
      },
      "Moto": {
        "fare": 68,
        "baseRate": "₹8/km",
        "description": "Quick and traffic-beating option"
      }
    }
  }
}
```

**❌ Error Responses**:
```json
// 400 Bad Request - Missing Parameters
{
  "success": false,
  "message": "Pickup and destination addresses are required"
}

// 422 Unprocessable Entity - Invalid Address
{
  "success": false,
  "message": "Unable to calculate distance. Please check addresses."
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### ✅ **Confirm Ride (Captain)**

#### **Endpoint**: `POST /rides/confirm`

**🎯 Purpose**: Allows captain to accept a ride request and updates ride status.

**🔧 Implementation Details**:
- Captain availability verification
- Ride assignment to captain
- Real-time notification to user
- ETA calculation from captain's current location

**🔒 Authentication**: Required (Bearer token - Captain only)

**📥 Request Body**:
```json
{
  "rideId": "60f7b3b3b3b3b3b3b3b3b3b3"
}
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Ride confirmed successfully",
  "data": {
    "ride": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "user": "60f7b3b3b3b3b3b3b3b3b3b1",
      "captain": "60f7b3b3b3b3b3b3b3b3b3b2",
      "pickup": "123 Main St, New York, NY",
      "destination": "456 Oak Ave, New York, NY",
      "status": "accepted",
      "fare": 127,
      "otp": "123456",
      "estimatedArrival": "2024-01-15T10:45:00.000Z"
    }
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🚀 **Start Ride**

#### **Endpoint**: `POST /rides/start-ride`

**🎯 Purpose**: Starts the ride after OTP verification between captain and user.

**🔧 Implementation Details**:
- OTP verification for security
- Ride status update to 'ongoing'
- Trip timer initiation
- Real-time location tracking start

**🔒 Authentication**: Required (Bearer token - Captain only)

**📥 Request Body**:
```json
{
  "rideId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "otp": "123456"
}
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Ride started successfully",
  "data": {
    "ride": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "status": "ongoing",
      "startTime": "2024-01-15T11:00:00.000Z",
      "startLocation": {
        "lat": 28.6139,
        "lng": 77.2090
      }
    }
  }
}
```

**❌ Error Responses**:
```json
// 400 Bad Request - Invalid OTP
{
  "success": false,
  "message": "Invalid OTP. Please check and try again."
}

// 409 Conflict - Ride Already Started
{
  "success": false,
  "message": "This ride has already been started"
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🏁 **End Ride**

#### **Endpoint**: `POST /rides/end-ride`

**🎯 Purpose**: Completes the ride, processes payment, and updates all related records.

**🔧 Implementation Details**:
- Final distance calculation
- Payment processing
- Trip summary generation
- Captain availability reset
- Rating system initiation

**🔒 Authentication**: Required (Bearer token - Captain only)

**📥 Request Body**:
```json
{
  "rideId": "60f7b3b3b3b3b3b3b3b3b3b3"
}
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Ride completed successfully",
  "data": {
    "ride": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "status": "completed",
      "endTime": "2024-01-15T11:25:00.000Z",
      "totalDistance": "8.7 km",
      "totalDuration": "25 mins",
      "finalFare": 130,
      "paymentStatus": "completed"
    },
    "receipt": {
      "receiptId": "RCP123456789",
      "downloadUrl": "/receipts/RCP123456789.pdf"
    }
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 🗺️ **Maps & Location APIs**

### 🎯 **Get Coordinates**

#### **Endpoint**: `GET /maps/get-coordinates`

**🎯 Purpose**: Converts a physical address to latitude and longitude coordinates using Google Geocoding API.

**🔧 Implementation Details**:
- Google Geocoding API integration
- Address validation and normalization
- Multiple address format support
- Caching for frequently requested locations

**🔒 Authentication**: Required (Bearer token)

**📥 Query Parameters**:
```
address=123%20Main%20St,%20New%20York,%20NY
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Coordinates retrieved successfully",
  "data": {
    "address": "123 Main St, New York, NY 10001, USA",
    "coordinates": {
      "lat": 40.7589,
      "lng": -73.9851
    },
    "placeId": "ChIJd8BlQ2FZwokRAFUEcm_qrcA",
    "formattedAddress": "123 Main St, New York, NY 10001, USA"
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 📏 **Get Distance & Time**

#### **Endpoint**: `GET /maps/get-distance-time`

**🎯 Purpose**: Calculates distance, travel time, and optimal route between two locations.

**🔧 Implementation Details**:
- Google Distance Matrix API integration
- Real-time traffic consideration
- Multiple route options
- Travel mode optimization (driving, walking, transit)

**🔒 Authentication**: Required (Bearer token)

**📥 Query Parameters**:
```
origin=123%20Main%20St,%20New%20York,%20NY
destination=456%20Oak%20Ave,%20New%20York,%20NY
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Distance and time calculated successfully",
  "data": {
    "origin": "123 Main St, New York, NY",
    "destination": "456 Oak Ave, New York, NY",
    "distance": {
      "text": "8.5 km",
      "value": 8500
    },
    "duration": {
      "text": "22 mins",
      "value": 1320
    },
    "durationInTraffic": {
      "text": "28 mins",
      "value": 1680
    },
    "status": "OK"
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

### 🔍 **Get Location Suggestions**

#### **Endpoint**: `GET /maps/get-suggestions`

**🎯 Purpose**: Provides autocomplete suggestions for location search using Google Places API.

**🔧 Implementation Details**:
- Google Places Autocomplete API
- Biased results based on user location
- Popular places prioritization
- Search history integration

**🔒 Authentication**: Required (Bearer token)

**📥 Query Parameters**:
```
input=Central%20Park
sessiontoken=unique-session-token
location=40.7589,-73.9851
radius=50000
```

**📤 Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Location suggestions retrieved successfully",
  "data": {
    "predictions": [
      {
        "description": "Central Park, New York, NY, USA",
        "placeId": "ChIJ4zGFAZpYwokRGUGph3Mf37k",
        "reference": "reference_string",
        "structured_formatting": {
          "main_text": "Central Park",
          "secondary_text": "New York, NY, USA"
        },
        "types": ["park", "establishment", "point_of_interest"]
      },
      {
        "description": "Central Park Zoo, New York, NY, USA", 
        "placeId": "ChIJH0OVl5dYwokRX2NE5iX3wOs",
        "reference": "reference_string_2",
        "structured_formatting": {
          "main_text": "Central Park Zoo",
          "secondary_text": "New York, NY, USA"
        },
        "types": ["zoo", "establishment", "point_of_interest"]
      }
    ],
    "status": "OK"
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 📡 **Socket.IO Events**

### 🔌 **Real-time Communication Events**

**🎯 Purpose**: WebSocket events for real-time communication between users, captains, and the server.

#### **📤 Client to Server Events**

```javascript
// User Events
socket.emit('join-user', { userId, token });
socket.emit('location-update', { lat, lng, rideId });
socket.emit('cancel-ride', { rideId });

// Captain Events  
socket.emit('join-captain', { captainId, token });
socket.emit('captain-location-update', { lat, lng, captainId });
socket.emit('ride-accepted', { rideId, captainId });
socket.emit('ride-started', { rideId, otp });
socket.emit('ride-completed', { rideId });

// General Events
socket.emit('disconnect');
```

#### **📥 Server to Client Events**

```javascript
// Ride Management Events
socket.on('new-ride', (rideData) => {
  // Notify nearby captains of new ride request
  console.log('New ride available:', rideData);
});

socket.on('ride-confirmed', (confirmData) => {
  // Notify user that captain accepted ride
  console.log('Captain found:', confirmData);
});

socket.on('ride-started', (startData) => {
  // Notify user that ride has begun
  console.log('Ride started:', startData);
});

socket.on('ride-ended', (endData) => {
  // Notify both parties that ride is complete
  console.log('Ride completed:', endData);
});

// Location Tracking Events
socket.on('location-update', (locationData) => {
  // Real-time location updates during ride
  updateMapPosition(locationData);
});

socket.on('eta-update', (etaData) => {
  // Dynamic ETA updates
  updateETA(etaData);
});
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## ❌ **Error Handling**

### 🚨 **HTTP Status Codes**

| Status Code | Meaning | Usage |
|-------------|---------|--------|
| `200` | OK | Successful GET, PUT, PATCH requests |
| `201` | Created | Successful POST requests (resource created) |
| `400` | Bad Request | Invalid request format or missing parameters |
| `401` | Unauthorized | Authentication required or invalid token |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Resource already exists |
| `422` | Unprocessable Entity | Validation errors |
| `500` | Internal Server Error | Server-side errors |

[⬅️ Back to Quick Navigation](#-quick-navigation)

### 📋 **Error Response Format**

All error responses follow this consistent structure:

```json
{
  "success": false,
  "message": "Human-readable error description",
  "error": {
    "code": "ERROR_CODE",
    "details": "Additional error information",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "errors": [
    {
      "msg": "Specific validation error",
      "param": "field_name",
      "location": "body|query|params"
    }
  ]
}
```

### 🔍 **Common Error Scenarios**

#### **🔐 Authentication Errors**
```json
// Missing Token
{
  "success": false,
  "message": "Access denied. No token provided.",
  "error": {
    "code": "NO_TOKEN",
    "details": "Authorization header is required"
  }
}

// Invalid Token
{
  "success": false,
  "message": "Invalid token provided.",
  "error": {
    "code": "INVALID_TOKEN",
    "details": "Token verification failed"
  }
}

// Expired Token
{
  "success": false,
  "message": "Token has expired.",
  "error": {
    "code": "TOKEN_EXPIRED",
    "details": "Please login again to get a new token"
  }
}
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 🧪 **Testing & Examples**

### 🛠️ **API Testing Tools**

#### **📡 Using cURL**
```bash
# User Registration
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'

# Authenticated Request (with token)
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json"
```

#### **⚡ Using Thunder Client / Postman**

1. **📝 Create Collection**: Organize API requests by functionality
2. **🔐 Setup Environment**: Configure base URL and authentication
3. **🎯 Test Scenarios**: Create test cases for different user flows
4. **📊 Automation**: Setup automated testing for CI/CD

[⬅️ Back to Quick Navigation](#-quick-navigation)

### 🔄 **Complete User Flow Example**

```javascript
// 1. User Registration
const userRegister = await fetch('/users/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullname: { firstname: 'John', lastname: 'Doe' },
    email: 'john@example.com',
    password: 'securePassword123'
  })
});

// 2. Get Fare Estimation
const fareEstimate = await fetch(
  `/rides/get-fare?pickup=123 Main St&destination=456 Oak Ave`,
  {
    headers: { 'Authorization': `Bearer ${token}` }
  }
);

// 3. Create Ride
const createRide = await fetch('/rides/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    pickup: '123 Main St, New York, NY',
    destination: '456 Oak Ave, New York, NY',
    vehicleType: 'Car'
  })
});
```

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

## 🚀 **Deployment Guide**

### 🌐 **Environment Variables**
```bash
# Production Environment Variables
NODE_ENV=production
PORT=4000
DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/xpressly
JWT_SECRET=your-super-secure-jwt-secret-key
GOOGLE_MAPS_API=your-google-maps-api-key

# Optional: Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional: Monitoring & Analytics
SENTRY_DSN=your-sentry-dsn
ANALYTICS_ID=your-analytics-id
```

### 📊 **Performance Monitoring**
- **🔍 Error Tracking**: Sentry integration for error monitoring
- **📈 Performance Metrics**: Response time and throughput tracking
- **📊 Database Monitoring**: MongoDB Atlas performance insights
- **🚨 Alerts**: Automated alerts for critical issues

[⬅️ Back to Quick Navigation](#-quick-navigation)

---

**✨ Made with ❤️ for the Xpressly Platform**

*This API documentation provides comprehensive information for integrating with the Xpressly backend service. For frontend integration examples and Socket.IO implementation, refer to the main project documentation.*

**📧 API Support**: [support@xpressly.com](mailto:support@xpressly.com)  
**📚 Developer Resources**: [docs.xpressly.com](https://docs.xpressly.com)

[⬅️ Back to Quick Navigation](#-quick-navigation)