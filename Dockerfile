FROM node:6.9.1

#ENV NODE_PATH /tictactoe

#RUN mkdir -p /tictactoe
#WORKDIR /tictactoe

#COPY package.json /tictactoe
#RUN npm-install --silent

COPY . /tictactoe
RUN npm install --silent

EXPOSE 8080
CMD ["node","run.js"]