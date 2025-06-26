
---

# Backend API Documentation

## Table of Contents

### User 

- [Backend API Documentation (User Register)](#backend-api-documentation-user-register)
  - [Description](#description)
  - [HTTP Method](#http-method)
  - [Required Packages](#required-packages)
  - [Controller File: `user.controller.js`](#controller-file-usercontrollerjs)
  - [Service File: `user.service.js`](#service-file-userservicejs)
  - [Model File: `user.model.js`](#model-file-usermodeljs)
  - [Request Body](#request-body)
  - [Status Codes & Responses](#status-codes--responses)

- [Backend API Documentation (User Login)](#backend-api-documentation-user-login)
  - [Description](#description-1)
  - [HTTP Method](#http-method-1)
  - [Request Body](#request-body-1)
  - [Status Codes & Responses](#status-codes--responses-1)

- [Backend API Documentation (User Profile)](#backend-api-documentation-user-profile)
  - [Description](#description-2)
  - [HTTP Method](#http-method-2)
  - [Request Body](#request-body-2)
  - [Status Codes & Responses](#status-codes--responses-2)

- [Backend API Documentation (User Logout)](#backend-api-documentation-user-logout)
  - [Description](#description-3)
  - [HTTP Method](#http-method-3)
  - [Request Body](#request-body-3)
  - [Status Codes & Responses](#status-codes--responses-3)

### Captain

- [Backend API Documentation (Captain Register)](#backend-api-documentation-captain-register)
  - [Description](#description-4)
  - [HTTP Method](#http-method-4)
  - [Required Packages](#required-packages-1)
  - [Controller File: `captain.controller.js`](#controller-file-captaincontrollerjs)
  - [Service File: `captain.service.js`](#service-file-captainservicejs)
  - [Model File: `captain.model.js`](#model-file-captainmodeljs)
  - [Request Body](#request-body-4)
  - [Status Codes & Responses](#status-codes--responses-4)

- [Backend API Documentation (Captain Login)](#backend-api-documentation-captain-login)
  - [Description](#description-5)
  - [HTTP Method](#http-method-5)
  - [Request Body](#request-body-5)
  - [Status Codes & Responses](#status-codes--responses-5)

- [Backend API Documentation (Captain Profile)](#backend-api-documentation-captain-profile)
  - [Description](#description-6)
  - [HTTP Method](#http-method-6)
  - [Request Body](#request-body-6)
  - [Status Codes & Responses](#status-codes--responses-6)

- [Backend API Documentation (Captain Logout)](#backend-api-documentation-captain-logout)
  - [Description](#description-7)
  - [HTTP Method](#http-method-7)
  - [Request Body](#request-body-7)
  - [Status Codes & Responses](#status-codes--responses-7)

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

### Ride

- [Backend API Documentation (Create Ride)](#backend-api-documentation-create-ride)
- [Backend API Documentation (Get Fare)](#backend-api-documentation-get-fare)

---

# Backend API Documentation (Create Ride)

## Description
Creates a new ride request and returns the ride details.

---

## HTTP Method
**POST** `/rides/create`

---

## Required Packages
Below are the main packages involved in this endpoint:

1. **express-validator** – Used for validating incoming request data.  
2. **ride.service.js** – Contains the business logic for creating a ride.  
3. **ride.model.js** – MongoDB schema for storing ride details.  

---

## Controller File: `ride.controller.js`
- **createRide(req, res)**  
  - Validates request data using `express-validator`.  
  - Extracts `pickup`, `destination`, and `vehicleType` from `req.body`.  
  - Calls `rideService.createRide`, passing the user ID and ride details.  
  - Responds with a **201** status code, returning the created ride object.

---

## Request Body
```json
{
  "pickup": "string (≥3 chars, required)",
  "destination": "string (≥3 chars, required)",
  "vehicleType": "string (Auto | Car | Moto, required)"
}
```

---

## Status Codes & Responses

1. **201 Created**  
   Example Successful Response:
   ```json
   {
     "_id": "ride-id-string",
     "user": "user-id-string",
     "pickup": "Pickup Address",
     "destination": "Destination Address",
     "fare": 100,
     "status": "pending",
     "otp": "123456"
   }
   ```

2. **400 Bad Request**  
   Returned if validation fails or required fields are missing. Example Error Response:
   ```json
   {
     "errors": [
       {
         "msg": "Invalid pickup address",
         "param": "pickup",
         "location": "body"
       }
     ]
   }
   ```

3. **500 Internal Server Error**  
   Returned if an unexpected error occurs. Example Error Response:
   ```json
   {
     "message": "Internal server error"
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)

---

# Backend API Documentation (Get Fare)

## Description
Calculates the estimated fare for a ride based on the pickup and destination addresses.

---

## HTTP Method
**GET** `/rides/get-fare`

---

## Required Packages
Below are the main packages involved in this endpoint:

1. **express-validator** – Used for validating incoming request data.  
2. **ride.service.js** – Contains the business logic for calculating the fare.  

---

## Controller File: `ride.controller.js`
- **getFare(req, res)**  
  - Validates request data using `express-validator`.  
  - Extracts `pickup` and `destination` from `req.query`.  
  - Calls `rideService.getFare`, passing the pickup and destination addresses.  
  - Responds with a **200** status code, returning the calculated fare.

---

## Request Query Parameters
```json
{
  "pickup": "string (≥3 chars, required)",
  "destination": "string (≥3 chars, required)"
}
```

---

## Status Codes & Responses

1. **200 OK**  
   Example Successful Response:
   ```json
   {
     "Auto": 50,
     "Car": 100,
     "Moto": 30
   }
   ```

2. **400 Bad Request**  
   Returned if validation fails or required fields are missing. Example Error Response:
   ```json
   {
     "errors": [
       {
         "msg": "Invalid pickup address",
         "param": "pickup",
         "location": "query"
       }
     ]
   }
   ```

3. **500 Internal Server Error**  
   Returned if an unexpected error occurs. Example Error Response:
   ```json
   {
     "message": "Internal server error"
   }
   ```

---

[⬅️ Back to Table of Contents](#table-of-contents)