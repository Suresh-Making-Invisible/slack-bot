# Use the official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Accept build arguments
ARG SLACK_BOT_TOKEN
ARG SLACK_SIGNING_SECRET

# Create .env file and write the environment variables
RUN echo "SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}" > .env
RUN echo "SLACK_SIGNING_SECRET=${SLACK_SIGNING_SECRET}" >> .env


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
