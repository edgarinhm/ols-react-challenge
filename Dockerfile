#---------------------------------------------------
# ----- Build stage ---------------------------------
# Use an official Node.js runtime as a parent image
FROM node:22.3.0-slim AS build

# Set the working directory in the container
WORKDIR /user/src/app

# Copy/run steps happen on specific files in a specific order to take advantage of docker caching
COPY ["package.json", "package-lock.json", "./"]

# Install app dependencies
RUN npm install

# Run linter, test and build
RUN npm run lint
RUN npm test
RUN npm run build

#---------------------------------------------------
#---------------------------------------------------
# ----- Deploy stage -------
FROM node:22.3.0-slim as deploy

# set node to production environment
ENV NODE_ENV production

# use least-priveledged user to create/run the container (named 'node' in nodejs)
USER node

# Set the working directory in the container
WORKDIR /user/src/app

# Copy the rest of your application code to the working directory
COPY . .

# Expose a port to communicate with the React app [Port you mentioned in the vite.config file]
EXPOSE 3000

# Start your React app
CMD ["npm", "run", "dev"]