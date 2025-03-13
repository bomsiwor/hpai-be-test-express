# Expres typescript

## **Overview**

Project test case for PT HNI / HPAI for backend engineer using TypeScript, Express, and containerized using Docker. This project utilize NoSQL database.

## **Tech Stack**

- **Backend:** Express.js (TypeScript & PNPM Package Manager)
- **Database:** MongoDB (Mongoose ORM)
- **Package Manager:** PNPM
- **Testing:** Jest
- **Containerization:** Docker

### Pre-requisites

- TypeScript (recommended globally installed)
- PNPM package manager

## **Project Structure**

```
📂 src
 ┣ 📂 controllers  # Post-Route handlers
 ┣ 📂 services     # Business logic
 ┣ 📂 repositories # Database process
 ┣ 📂 models       # Mongoose schema
 ┣ 📂 middlewares  # Middleware
 ┣ 📂 routes        # Routes
 ┣ 📂 seeders      # Database seeding
 ┣ 📂 tests        # Unit & integration tests (not implemented yet)
 ┣ 📜 main.ts       # Express app entry point
```

## **Setup Instructions**

### **1. Clone the repository**

```sh
git clone https://github.com/bomsiwor/hpai-be-test-express <ur cool folder>
cd <ur cool folder>
```

### **2. Install dependencies**

```sh
pnpm install
```

### **3. Set up environment variables**

Create a `.env`
Copy it from .env.example

```
PORT=3000
MONGO_URI=mongodb://taleteller_db:taleteller_db_password@mongodb:27017/taleteller
JWT_SECRET=your-secret-key
```

### **4. Run with Docker**

```sh
docker-compose up --build
```

This will:  
✅ Start the MongoDB container  
✅ Wait for MongoDB to be ready  
✅ Run the user seeder script  
✅ Start the Server

### **5. Run Tests**

Not implemented yet

```sh
pnpm test
```

## **API Endpoints**

### **Auth Routes**

- `POST /auth/login` – Authenticate user
- `POST /auth/register` – Register a new user
- `POST /auth/logout` – Logout user
- `GET /auth/me` – Get current user

### **User Routes** _(Requires `admin` or `super-admin` role)_

- `GET /users` – Get all users
- `GET /users/:id` – Get a specific user
- `POST /users` – Create a new user
- `DELETE /users/:id` – Delete a user
