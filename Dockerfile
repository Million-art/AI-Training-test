FROM node:20-alpine

WORKDIR /app

COPY package.json ./
# Install all deps (including devDependencies) so npm test works in a clean environment
RUN npm install

COPY . .
# Run the test suite by default (no manual steps required)
CMD ["npm", "test"]
