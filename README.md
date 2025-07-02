# 🚗 Xpressly - Full Stack MERN Application

A sleek and modern ride-booking platform built with the power of the MERN stack. Designed to reflect real-world applications, this project blends intuitive design with scalable architecture—perfect for showcasing full-stack development skills in a real-life scenario.

# 🚗 Live Demo: Experience the Xpressly project in action [here](https://uberclone0406.netlify.app).

## 📋 Table of Contents

- [🚗 Xpressly - Full Stack MERN Application](#-xpressly---full-stack-mern-application)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🏗️ Project Architecture](#️-project-architecture)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📦 Prerequisites](#-prerequisites)
  - [🚀 Quick Start](#-quick-start)
  - [🔧 Environment Setup](#-environment-setup)
  - [📱 Application Features](#-application-features)
  - [🌐 API Endpoints](#-api-endpoints)
  - [🎨 UI/UX Highlights](#-uiux-highlights)
  - [📊 Real-time Features](#-real-time-features)
  - [🚦 Production Optimizations](#-production-optimizations)
  - [🧪 Testing](#-testing)
  - [🚀 Deployment](#-deployment)
  - [🐛 Troubleshooting](#-troubleshooting)
  - [📄 License](#-license)
  - [🤝 Contributing](#-contributing)

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Dual User System**: Separate registration and authentication for riders and captains
- **JWT Token-based Security**: Secure authentication with token management
- **Protected Routes**: Route protection with automatic redirects
- **Session Management**: Persistent login sessions with token validation

### 🚗 Ride Management
- **Real-time Ride Booking**: Instant ride creation and captain matching
- **Dynamic Fare Calculation**: Google Maps API integration for accurate pricing
- **Multi-vehicle Support**: Auto, Car, and Motorcycle options
- **OTP Verification**: Secure ride start verification system
- **Live Ride Tracking**: Real-time location updates during rides

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Maps**: Google Maps integration with real-time tracking
- **Smooth Animations**: GSAP-powered transitions and interactions
- **Auto-complete Search**: Location suggestions with Google Places API
- **Real-time Notifications**: Socket.IO powered live updates

### 👨‍✈️ Captain Features
- **Dashboard Management**: Comprehensive captain control panel
- **Ride Acceptance System**: Accept/decline incoming ride requests
- **Location Broadcasting**: Real-time location sharing with riders
- **Ride Status Management**: Complete ride lifecycle management
- **Earnings Tracking**: Transparent payment and ride completion system

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🏗️ Project Architecture

```
xpressly/
├── Backend/                  # Node.js Express Server
│   ├── Controllers/          # Route controllers
│   ├── Models/               # MongoDB schemas
│   ├── Routes/               # API route definitions
│   ├── Services/             # Business logic
│   ├── Middlewares/          # Authentication & validation
│   ├── DB/                   # Database connection
│   └── socket.js             # Real-time communication
├── Frontend/                 # React Application
│   ├── src/
│   │   ├── Components/       # Reusable UI components
│   │   ├── Pages/            # Route-based pages
│   │   ├── Context/          # React Context API
│   │   └── assets/           # Static assets
│   └── dist/                 # Build output (generated)
└── Documentation/            # API & setup docs
```

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation middleware
- **Google Maps API** - Geolocation and mapping services

### Frontend
- **React 19** - UI library with latest features
- **Vite** - Next generation frontend build tool
- **React Router DOM** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **GSAP** - High-performance animations
- **Axios** - HTTP client for API calls
- **Socket.IO Client** - Real-time client communication
- **Remixicon** - Icon library

### Development & Deployment
- **ESLint** - Code linting and formatting
- **Netlify** - Frontend deployment
- **Render** - Backend deployment
- **MongoDB Atlas** - Cloud database hosting

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or Atlas account) - [Setup guide](https://www.mongodb.com/docs/manual/installation/)
- **Google Maps API Key** - [Get API key](https://console.cloud.google.com/)
- **Git** - [Download here](https://git-scm.com/)

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Sahadipankar/xpressly.git
cd xpressly
```

### 2. Backend Setup
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🔧 Environment Setup

### Backend Environment Variables (`.env`)
```bash
# Database Configuration
DB_CONNECT=mongodb://localhost:27017/xpressly
# or for MongoDB Atlas:
# DB_CONNECT=mongodb+srv://username:password@cluster.mongodb.net/xpressly

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here

# Google Maps API Key
GOOGLE_MAPS_API=your_google_maps_api_key_here

# Server Port
PORT=4000
```

### Frontend Environment Variables (`.env`)
```bash
# Backend API URL
VITE_BASE_URL=http://localhost:4000
# For production: https://your-backend-domain.com

# Google Maps API Key (same as backend)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Google Maps API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Distance Matrix API
   - Places API
4. Create credentials (API Key)
5. Restrict the API key (recommended for production)

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 📱 Application Features

### For Riders (Users)
- **Account Management**: Registration, login, profile management
- **Ride Booking**: 
  - Location search with autocomplete
  - Multiple vehicle type selection (Auto/Car/Motorcycle)
  - Real-time fare calculation
  - Instant ride booking
- **Real-time Tracking**: Live captain location and ETA
- **Ride Management**: View ride status, cancel rides, ride history

### For Captains (Drivers)
- **Driver Dashboard**: Overview of ride requests and earnings
- **Ride Management**:
  - Accept/decline incoming rides
  - OTP verification for ride starts
  - Real-time navigation to pickup/drop locations
  - Complete rides with payment confirmation
- **Location Services**: Automatic location broadcasting to riders
- **Profile Management**: Vehicle details, availability status

### Admin Features
- **Real-time Monitoring**: All active rides and users
- **Analytics Dashboard**: Ride statistics and performance metrics
- **User Management**: User and captain account management

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🌐 API Endpoints

### User Authentication
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile
- `GET /users/logout` - User logout

### Captain Authentication
- `POST /captains/register` - Captain registration
- `POST /captains/login` - Captain login
- `GET /captains/profile` - Get captain profile
- `GET /captains/logout` - Captain logout

### Ride Management
- `POST /rides/create` - Create new ride request
- `GET /rides/get-fare` - Calculate ride fare
- `POST /rides/confirm` - Captain confirms ride
- `GET /rides/start-ride` - Start ride with OTP
- `POST /rides/end-ride` - Complete ride

### Maps & Location
- `GET /maps/get-coordinates` - Get coordinates from address
- `GET /maps/get-distance-time` - Calculate distance and time
- `GET /maps/get-suggestions` - Location autocomplete suggestions

For detailed API documentation, see: [Backend/Readme.md](./Backend/Readme.md)

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🎨 UI/UX Highlights

### Design Philosophy
- **Mobile-First**: Responsive design optimized for mobile devices
- **Minimalist Interface**: Clean, intuitive user interface
- **Real-time Feedback**: Instant visual feedback for all actions
- **Accessibility**: WCAG-compliant design standards

### Key UI Components
- **Interactive Maps**: Full-screen Google Maps integration
- **Animated Panels**: Smooth slide-up panels with GSAP animations
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages and retry options
- **Toast Notifications**: Non-intrusive status notifications

### Color Scheme
- **Primary**: Xpressly-inspired black and green palette
- **Secondary**: Gray tones for secondary information
- **Accents**: Orange/yellow for call-to-action elements
- **Status Colors**: Green for success, red for errors, blue for information

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 📊 Real-time Features

### Socket.IO Implementation
- **Connection Management**: Automatic reconnection handling
- **Room-based Communication**: Separate channels for users and captains
- **Event System**:
  - `new-ride` - Notify available captains of ride requests
  - `ride-confirmed` - Notify user when captain accepts ride
  - `ride-started` - Notify user when ride begins
  - `ride-ended` - Notify both parties when ride completes
  - `location-update` - Real-time location sharing

### Live Tracking
- **Captain Location**: Real-time captain position updates
- **ETA Calculation**: Dynamic arrival time estimates
- **Route Optimization**: Best route suggestions using Google Maps
- **Status Updates**: Live ride status changes

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🚦 Production Optimizations

### Performance Enhancements
- **Code Splitting**: Dynamic imports for route-based splitting
- **Bundle Optimization**: Separate vendor, socket, and maps chunks
- **Image Optimization**: Optimized asset delivery
- **Caching Strategy**: Browser and server-side caching

### Security Measures
- **JWT Token Management**: Secure token handling with expiration
- **Input Validation**: Comprehensive server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing
- **Environment Variables**: Secure configuration management
- **Password Hashing**: bcrypt for password security

### Error Handling
- **Global Error Handling**: Centralized error management
- **Graceful Degradation**: Fallback options for failed services
- **Logging System**: Comprehensive error logging
- **User-Friendly Messages**: Clear error communication

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🧪 Testing

### Testing Strategy
```bash
# Run backend tests
cd Backend
npm test

# Run frontend tests
cd Frontend
npm test

# Run integration tests
npm run test:integration
```

### Test Coverage Areas
- **API Endpoints**: All CRUD operations
- **Authentication**: Login/logout flows
- **Real-time Features**: Socket.IO connections
- **UI Components**: React component testing
- **User Flows**: End-to-end testing

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🚀 Deployment

### Backend Deployment (Render)
1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard:
   - `DB_CONNECT`: MongoDB Atlas connection string
   - `JWT_SECRET`: Strong secret key
   - `GOOGLE_MAPS_API`: Your API key
   - `PORT`: 4000
3. Deploy with automatic builds enabled

### Frontend Deployment (Netlify)
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Set environment variables:
   - `VITE_BASE_URL`: Your backend URL
   - `VITE_GOOGLE_MAPS_API_KEY`: Your API key
4. Add redirect rules in `netlify.toml` for SPA routing

### Database Setup (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas
2. Set up database user and security rules
3. Get connection string and update environment variables
4. Configure IP whitelist for your deployment servers

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Problems
- Verify MongoDB service is running
- Check connection string format
- Ensure network connectivity for Atlas
- Verify database user permissions

#### Google Maps API Issues
- Confirm API key is valid and active
- Check if required APIs are enabled
- Verify billing account is set up
- Check browser console for API errors

#### Socket Connection Problems
- Verify backend server is running
- Check CORS configuration
- Ensure WebSocket support in deployment environment
- Verify firewall settings

#### Authentication Issues
- Check JWT_SECRET is properly set
- Verify token is being sent in request headers
- Ensure token hasn't expired
- Check if token is blacklisted

### Performance Issues
- Check bundle size and implement code splitting
- Optimize images and assets
- Implement proper caching strategies
- Monitor database query performance

[⬅️ Back to Table of Contents](#-table-of-contents)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/Sahadipankar/xpressly/issues).

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Made with ❤️ using MERN Stack**

*This project demonstrates full-stack development capabilities with modern web technologies, real-time features, and production-ready deployment strategies.*

[⬅️ Back to Table of Contents](#-table-of-contents)