#!/bin/bash

echo "     ____________ "
echo "*~*~| Setting up |~*~*"
echo "    |____________|"

npm install nodemon
npm install create-react-app

echo "Removing postgres image and running it again"
docker stop pg2
docker rm pg2
docker run -p 5432:5432 --name pg2 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

echo "     _____________________ "
echo "*~*~| Running npm install |~*~*"
echo "    |_____________________|"

echo "npm install in root.."
npm install --silent
cd client
echo "npm install in client.."
npm install --silent
cd ..

npm run migratedb-dev