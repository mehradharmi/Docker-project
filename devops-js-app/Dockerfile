FROM node:18-alpine

WORKDIR /app

# Copy only dependency files first
COPY package.json .

RUN npm install

# Copy rest of the code
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
