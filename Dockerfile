# Use Node.js 20 lightweight Alpine image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file first to leverage Docker's layer caching
COPY package.json package-lock.json ./

# Install dependencies (ignoring scripts to avoid unnecessary postinstall hooks before building)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Nuxt application
RUN npm run build

# Stage 2: Production runtime
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy built outputs and necessary files from builder stage
COPY --from=builder /app/.output ./.output

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=2369
ENV NODE_ENV=production

# Expose the default Nuxt port
EXPOSE 2369

# Start the Node.js server from the built output
CMD ["node", ".output/server/index.mjs"]
