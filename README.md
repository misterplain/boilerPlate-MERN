# MERN E-Commerce Boilerplate

A full-stack e-commerce starter built with MongoDB, Express, React, and Node.js.
This project includes authentication, cart and order flows, admin management tools,
and image hosting integration.

## Live Demo

- Frontend: https://e-commerce-mern-eryu.onrender.com/

## Core Features

### Storefront

- Browse products by collection
- Search and filter catalog results
- Add/remove cart items
- Guest checkout and authenticated checkout
- Product reviews and ratings

### Authentication

- Email/password signup and signin
- JWT access + refresh token flow
- OAuth login (Google and GitHub)

### User Account

- Manage profile and avatar
- Manage saved addresses
- Manage favorites
- View personal order history

### Admin

- Create, edit, and delete collections
- Create, edit, and delete products
- Moderate product reviews
- Search and manage orders

## Tech Stack

- Frontend: React, Redux, Material UI, Formik, Yup, Axios
- Backend: Node.js, Express, Mongoose, Passport, Winston
- Services: MongoDB, Cloudinary, OAuth providers

## Project Structure

```text
client/   # React frontend
server/   # Express API + MongoDB logic
review/   # Architecture and improvement notes
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm 8+
- MongoDB instance (local or hosted)

### 1) Install Dependencies

```bash
# frontend
cd client
npm install

# backend
cd ../server
npm install
```

### 2) Configure Environment Variables

Create `client/.env`:

```bash
NODE_ENV=development
REACT_APP_SERVER_API_URL=http://localhost:5000
REACT_APP_CLIENT_URL=http://localhost:3000
PEXELS_API_KEY=your_pexels_api_key
```

Create `server/.env` (see `server/.env.example` for full template):

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_cloud_key
CLOUD_KEY_SECRET=your_cloud_key_secret
```

### 3) Run the App

```bash
# backend
cd server
npm run dev

# frontend (new terminal)
cd client
npm start
```

## Scripts

### Frontend (`client/package.json`)

- `npm start`: run React development server
- `npm run build`: production build
- `npm test`: run frontend tests

### Backend (`server/package.json`)

- `npm run dev`: run API with nodemon
- `npm run start`: run API with node

## API Overview

Main route groups:

- `/auth`
- `/user`
- `/collection`
- `/product`
- `/reviews`
- `/cart`
- `/orders`

## Quality and Conventions

- Centralized server-side error middleware
- Structured server logging with Winston
- No debug `console.log` statements in application code
- camelCase naming for variables/functions, PascalCase for React components

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.

## Roadmap

Current improvement roadmap and prioritization live in `review/todo.md`.

## Contact

Feedback is welcome: https://www.linkedin.com/in/patrick-o-brien-6743b044/
