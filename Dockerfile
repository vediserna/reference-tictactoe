FROM node:6.9.1

WORKDIR /tictactoe

COPY . /tictactoe
RUN npm install --silent

EXPOSE 3000

ENV NODE_PATH .

CMD ["node","run.js"]