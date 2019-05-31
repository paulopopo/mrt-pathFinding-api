FROM node:8
WORKDIR /usr/src
COPY . .
RUN npm install
ENTRYPOINT ["npm", "start"]