FROM node:latest
WORKDIR /app
COPY ./ ./
RUN npm install
EXPOSE 3000
RUN npm run build
ENTRYPOINT ["node", "build/index.js"]