# Backend Dockerfile
# Multi-stage build for optimized production image

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Copy package files and tsconfig
COPY package*.json ./
COPY tsconfig.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy migration and seed scripts
COPY src/infrastructure/database/postgres/migrations ./dist/infrastructure/database/postgres/migrations
COPY src/infrastructure/database/seeds/seedData.json ./dist/infrastructure/database/seeds/seedData.json

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application with tsconfig-paths
CMD ["node", "-r", "tsconfig-paths/register", "dist/server.js"]

