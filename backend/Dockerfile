FROM node:20-alpine
WORKDIR /backend
COPY . .
RUN npm install
HEALTHCHECK CMD curl --fail http://localhost:3001/ || exit 1
CMD ["node","server.js"]
