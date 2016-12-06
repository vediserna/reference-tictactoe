version: '2'
services:
  server:
    image: vediserna/tictactoe:${GIT_COMMIT}
    ports:
      - "8080:8080"
      - "3000:3000"
    environment:
      - NODE_ENV=prod
  postgres:
    image: postgres:latest
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=mysecretpassword
      - POSTGRES_USER=postgres
            