# Backend Api Documentation

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