FROM node:current-alpine3.15
WORKDIR /app
COPY ./ ./
RUN npm install
EXPOSE 3000
RUN npm run build
ENTRYPOINT ["node", "build/index.js"]