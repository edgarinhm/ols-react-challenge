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
FROM dependencies As build
# Set the working directory in the container
WORKDIR /usr/src/app
# Copy the rest of your application code to the working directory
COPY . .
RUN pnpm run build

#---------------------------------------------------
#---------------------------------------------------
# ----- Deploy stage 3 -------
FROM nginx:1.25.4-alpine3.18 As deploy

# Copy the rest of your application code to the working directory
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

# Start your nginx
ENTRYPOINT [ "nginx","-g","daemon off;"]