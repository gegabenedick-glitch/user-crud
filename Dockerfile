
# Stage 1: Build Ionic Angular application
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Build production application
RUN npm run build

# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Copy production build
COPY --from=builder /app/www /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
