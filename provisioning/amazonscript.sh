#!/bin/bash
#echo "Killing pg2 if it is running"
#docker kill pg2
echo "docker-compose down to shut down connections that are already up"
docker-compose down

echo "Updating images in AWS computer"
docker build -t vediserna/tictactoe:$GIT_COMMIT .

echo "Running docker-compose up"
docker-compose up -d

exit