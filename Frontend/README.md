
# 🚕 Xpressly Frontend

> **Welcome to the Xpressly Frontend!**

This is the frontend for the **Xpressly** ride-hailing application, built with ⚛️ React and ⚡ Vite. It provides a modern, responsive user interface for both users and captains (drivers), supporting real-time ride booking, tracking, and management.

## 📚 Table of Contents
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [File & Folder Overview](#file--folder-overview)
  - [Root Files](#root-files)
  - [src/](#src)
    - [Components/](#components)
    - [Context/](#context)
    - [Pages/](#pages)
    - [styles/](#styles)
    - [assets/](#assets)
- [How to Run](#how-to-run)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributing](#contributing)

---



## 🗂️ Project Structure

[⬆️ Back to Table of Contents](#table-of-contents)

```
Frontend/
├── eslint.config.js
├── index.html
├── netlify.toml
├── package.json
├── README.md
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── react.svg
    ├── Components/
    ├── Context/
    ├── Pages/
    └── styles/
```



## ✨ Key Features

[⬆️ Back to Table of Contents](#table-of-contents)
- **👥 User and Captain (Driver) Interfaces**: Separate flows for users and captains, including login, signup, dashboard, and ride management.
- **📡 Real-Time Ride Tracking**: Live ride status updates and driver tracking using sockets.
- **🎨 Modern UI**: Built with React and styled for a smooth user experience.
- **🧠 State Management**: Uses React Context for managing user, captain, and socket state.
- **⚡ Vite-Powered**: Fast development and build process.



## 🗃️ File & Folder Overview

[⬆️ Back to Table of Contents](#table-of-contents)

### 📄 Root Files
- **eslint.config.js**: ESLint configuration for code linting.
- **index.html**: Main HTML entry point for the app.
- **netlify.toml**: Netlify deployment configuration.
- **package.json**: Project dependencies and scripts.
- **vite.config.js**: Vite configuration for development/build.

### 🗂️ public/
- **vite.svg**: Vite logo asset.

### 🗂️ src/
Main source code for the frontend app.

#### 📝 App.jsx, App.css, main.jsx, index.css
- **App.jsx**: Root React component, sets up routing and context providers.
- **App.css**: Global styles for the app.
- **main.jsx**: Entry point for React, renders `<App />`.
- **index.css**: Additional global styles.

#### 🖼️ assets/
- **react.svg**: React logo asset.

#### 🧩 Components/
Reusable UI components for various app features:
- **CaptainDetails.jsx**: Displays captain (driver) details.
- **ConfirmRide.jsx**: UI for confirming a ride booking.
- **ConfirmRidePopUp.jsx**: Popup for ride confirmation.
- **FinishRide.jsx**: UI for ending a ride.
- **LiveTracking.jsx**: Real-time ride/driver tracking.
- **LocationSearchPanel.jsx**: Search and select locations.
- **LookingForDriver.jsx**: UI shown while searching for a driver.
- **RidePopUp.jsx**: Popup for ride details.
- **VehiclePanel.jsx**: Vehicle selection panel.
- **WaitingForDriver.jsx**: UI shown while waiting for a driver.
- **XpresslyLogo.jsx**: App logo component.

#### 🌐 Context/
React Contexts for global state management:
- **CaptainContext.jsx**: State and logic for captain (driver) data.
- **SocketContext.jsx**: Manages socket connections for real-time features.
- **UserContext.jsx**: State and logic for user data.

#### 📄 Pages/
Page-level components for routing:
- **CaptainDashboard.jsx**: Captain's dashboard after login.
- **CaptainLogin.jsx**: Captain login page.
- **CaptainLogout.jsx**: Captain logout logic/page.
- **CaptainProtectWrapper.jsx**: Route protection for captain pages.
- **CaptainRiding.jsx**: Captain's ride-in-progress page.
- **CaptainSignUp.jsx**: Captain registration page.
- **Home.jsx**: Main landing page for the app.
- **Riding.jsx**: User's ride-in-progress page.
- **Start.jsx**: Starting page for a new ride.
- **UserLogin.jsx**: User login page.
- **UserLogout.jsx**: User logout logic/page.
- **UserProtectWrapper.jsx**: Route protection for user pages.
- **UserSignUp.jsx**: User registration page.

#### 🎬 styles/
- **animations.css**: CSS animations used throughout the app.



## 🏁 How to Run

[⬆️ Back to Table of Contents](#table-of-contents)

1. **Install dependencies:**
   ```cmd
   cd Frontend
   npm install
   ```
2. **Start the development server:**
   ```cmd
   npm run dev
   ```
3. **Open in browser:**
   Visit `http://localhost:5173` (or as indicated in the terminal).



## 📦 Dependencies

[⬆️ Back to Table of Contents](#table-of-contents)
- **React**: UI library
- **Vite**: Build tool
- **Other dependencies**: See `package.json` for the full list.



## ⚙️ Configuration

[⬆️ Back to Table of Contents](#table-of-contents)
- **Vite**: Configured via `vite.config.js`.
- **ESLint**: Configured via `eslint.config.js`.
- **Netlify**: Deployment settings in `netlify.toml`.



## 🤝 Contributing

[⬆️ Back to Table of Contents](#table-of-contents)
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Open a pull request.

---



> ℹ️ For backend documentation, see the [`Backend/Readme.md`](../Backend/Readme.md) file.

---

<p align="center">
  <b>Made with ❤️ by the Xpressly Team</b>
</p>


[⬆️ Back to Table of Contents](#table-of-contents)
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
