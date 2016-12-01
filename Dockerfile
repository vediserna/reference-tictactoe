FROM node
ENV NODE_PATH /bin/bash
RUN mkdir -p /tictactoe
WORKDIR /tictactoe

COPY package.json .
RUN npm-install --silent

COPY ./build/ .

EXPOSE 3000
CMD ["node","run.js"]