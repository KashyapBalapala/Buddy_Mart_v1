# FROM node:lts-alpine

# WORKDIR /app

# COPY . .

# RUN npm install --only=production --prefix backend

# USER node

# CMD ["npm", "start", "--prefix", "backend"]

# EXPOSE 8000


# Use Node.js LTS version based on Alpine
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY backend/package*.json ./backend/

# Install only production dependencies
RUN npm install --only=production --prefix backend

# Copy all other project files
COPY . .

# Use a non-root user for security
USER node

# Expose port 8000 for the backend service
EXPOSE 8000

# Start the backend application using the specified prefix
CMD ["npm", "start", "--prefix", "backend"]
