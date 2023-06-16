# Specify the base image
FROM node:18.16

# Set the working directory
WORKDIR /web

# Copy package.json and package-lock.json (if available)
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the desired port (if needed)
EXPOSE 5173

# Specify the startup command
CMD ["npm", "run", "dev:hosted"]