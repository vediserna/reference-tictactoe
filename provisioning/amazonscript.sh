#!/bin/bash
echo "Killing pg2 if it is running"
docker kill ðg2

echo "Updating images in AWS computer"
docker build -t vediserna/tictactoe:$GIT_COMMIT .

echo "Running docker-compose up"
docker-compose up