#---------------------------------------------------
# ----- Build stage 1 ---------------------------------
# Use an official Node.js runtime as a parent image
FROM node:22.3.0-slim AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install app dependencies
RUN pnpm install

# Copy the rest of your application code to the working directory
COPY . .
RUN pnpm run build

#---------------------------------------------------
#---------------------------------------------------
# ----- Deploy stage 2 -------
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# set node to production environment
# ENV NODE_ENV production

# Copy the rest of your application code to the working directory
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose a port to communicate with the React app [Port you mentioned in the vite.config file]
# EXPOSE 3000

# Start your React app
CMD ["npm", "run", "deploy"]