FROM node:18.10.0-bullseye-slim

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .

RUN npm install

# Bundle app source
COPY . .

# Set the user
USER node

# Expose the Node.js port
EXPOSE 5173

# Start the web server using the dev script
CMD [ "npm", "run", "dev" ]
