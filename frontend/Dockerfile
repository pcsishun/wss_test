FROM node:lts-alpine
# RUN npm install -g http-server
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .

EXPOSE 5990
# CMD [ "http-server", "dist" ]
CMD ["npm", "run", "dev"]