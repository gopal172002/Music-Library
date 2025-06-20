# Music Library

This is a music application built using React and Micro Frontend Architecture. The application consists of two parts:
1. Main App (Host) - Contains the authentication and container logic
2. Music Library (Remote) - A micro frontend that handles the music library functionality

## Features

- Clean and modern UI for displaying music library
- Filter, sort, and group by features for Album, Artist, and Title
- Role-based authentication (admin/user)
- Micro Frontend Architecture using Module Federation
- Responsive design using Material-UI

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Running Locally

1. Clone repositories:
```
https://github.com/gopal172002/Music-Library.git
```

```
cd Music-Library
```

2. Install dependencies:
```bash
npm install
```

3. Start application:
```bash
npm run build
```
```bash
npm run preview
```

The application will be available at:
- Music Library: http://localhost:5174

## Demo Credentials

Two user roles are available for testing:

1. Admin User
   - Username: admin
   - Password: admin123
   - Can add and delete songs

2. Regular User
   - Username: user
   - Password: user123
   - Can only view and filter songs

## Architecture

### Micro Frontend Architecture

The application uses Module Federation to split the codebase into two parts:

1. Main App (Host)
   - Handles authentication and routing
   - Contains the container logic
   - Dynamically loads the Music Library micro frontend

2. Music Library (Remote)
   - Implements the music library functionality
   - Exposes components to the host application
   - Handles song management features

### Authentication

- Uses a simple in-memory JWT approach
- Tokens are stored in localStorage
- Role-based access control for different features

## Deployment

The application is deployed on Vercel:

- **Main App (Host):** [https://music-app-main-host-djo6.vercel.app/](https://music-app-main-host-djo6.vercel.app/)
- **Music Library (Remote):** [https://music-library-chi.vercel.app/](https://music-library-chi.vercel.app/)

### Deployment Process

1. Push changes to the main branch
2. Vercel automatically builds and deploys both applications
3. The main app is configured to load the music library from its deployment URL

## Technologies Used

- React 18
- TypeScript
- Vite
- Module Federation
- Material-UI
- React Router
- JWT for authentication
