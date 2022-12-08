FROM node:18.10.0-bullseye-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
USER node
EXPOSE 3000
CMD ["npm", "run", "dev"]