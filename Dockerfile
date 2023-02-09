FROM node:bullseye-slim

WORKDIR /app
COPY . .

EXPOSE 3000

CMD npm config set prefer-offline true \
    && npm install \
    && npm run start