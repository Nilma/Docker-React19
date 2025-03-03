# Docker-React19
# Dockerized React 19 + Vite App

## Overview
This guide provides step-by-step instructions on how to containerize a React 19 application using Vite with Docker.

## Prerequisites
- **Docker** installed on your machine.
- **Node.js (optional)** for local development before containerization.
- A **React 19 + Vite** app (or create one with `npm create vite@latest my-app -- --template react`).

---

## 1️⃣ Setting Up the Docker Environment
### Create a `Dockerfile`
```dockerfile
# Stage 1: Build the Vite app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app (output will be in 'dist')
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy built files from 'dist' to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Create a `.dockerignore` file
```plaintext
node_modules
dist
.dockerignore
Dockerfile
docker-compose.yml
```

### (Optional) Create `docker-compose.yml`
```yaml
version: "3.8"
services:
  vite-app:
    build: .
    ports:
      - "3000:80"
    container_name: vite_docker_app
```

---

## 2️⃣ Building and Running the Docker Container
### Build the Docker Image
```sh
docker build -t vite-docker-app .
```

### Run the Container
```sh
docker run -p 3000:80 vite-docker-app
```

### Using Docker Compose (Optional)
```sh
docker-compose up --build
```

---

## 3️⃣ Access the Application
Once the container is running, open your browser and go to:
👉 **http://localhost:3000/**

---

## 4️⃣ Stopping and Removing Containers
### Stop the Running Container
```sh
docker ps
# Find the container ID and replace <CONTAINER_ID>
docker stop <CONTAINER_ID>
```

### Remove the Container
```sh
docker rm <CONTAINER_ID>
```

### Remove the Docker Image
```sh
docker rmi vite-docker-app
```

---

## 5️⃣ Debugging Tips
- If the app is not loading, ensure the container is running with:
  ```sh
  docker ps
  ```
- Check logs if there are issues:
  ```sh
  docker logs <CONTAINER_ID>
  ```
- If port **3000** is in use, change it in `docker run -p 8080:80 vite-docker-app` and access via **http://localhost:8080/**.

---

## Done! Your React 19 + Vite app is now running in a Docker container. 

