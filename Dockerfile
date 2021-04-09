FROM node:lts-alpine
COPY . /app
WORKDIR /app
RUN npm install --silent
EXPOSE 8000
CMD ["node", "index.js"]