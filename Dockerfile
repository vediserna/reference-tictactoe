FROM node:6.9.1

WORKDIR /tictactoe

COPY . /tictactoe
RUN npm install --silent

EXPOSE 3000

ENV NODE_PATH .

#On run, the dockerrunscript is run in order to connect to the database before program is started
CMD ./dockerrunscript.sh