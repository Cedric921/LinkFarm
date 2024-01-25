FROM node:18.15.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy app source code
COPY . .

# Build app
RUN npm run build --production

COPY ./.env ./build

# Expose port
EXPOSE 3333

# Start app
CMD ["node", "./build/server.js"]