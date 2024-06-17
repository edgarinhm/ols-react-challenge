#---------------------------------------------------
# ----- Build stage ---------------------------------
# Use an official Node.js runtime as a parent image
FROM node:22.3.0-slim AS build

# Set the working directory in the container
WORKDIR /user/src/app

# Copy package.json and package-lock.json to the working directory
COPY ["package.json", "package-lock.json", "./"]

# Install app dependencies
RUN npm install

#---------------------------------------------------
#---------------------------------------------------
# ----- Deploy stage -------
# set node to production environment
ENV NODE_ENV production

# Copy the rest of your application code to the working directory
COPY . .

# Expose a port to communicate with the React app [Port you mentioned in the vite.config file]
EXPOSE 3000

# Start your React app
CMD ["npm", "run", "dev"]