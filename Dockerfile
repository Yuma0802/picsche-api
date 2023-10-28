# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application will listen on
EXPOSE 8080

# Define the command to start your application
CMD [ "yarn", "start" ]