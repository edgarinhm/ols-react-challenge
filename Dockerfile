#---------------------------------------------------
# ----- Dependencies stage 1 ---------------------------------
# Use an official Node.js runtime as a parent image
FROM node:22.3.0-slim AS base

FROM base as dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install app dependencies
RUN pnpm install

#------------------------------------------------------
# ----- Build stage 2 ---------------------------------
#rebuild the source code only when needed
FROM dependencies As builder
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy the rest of your application code to the working directory
COPY . .
RUN pnpm run build

#---------------------------------------------------
#---------------------------------------------------
# ----- Deploy stage 3 -------
FROM node:22-alpine As deploy

# Set the working directory in the container
WORKDIR /usr/src/app

# set node to production environment
# ENV NODE_ENV production

# Copy the rest of your application code to the working directory
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose a port to communicate with the React app [Port you mentioned in the vite.config file]
EXPOSE 4173

# Start your React app
CMD ["npm", "run", "preview"]