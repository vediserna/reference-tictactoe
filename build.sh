#!/bin/bash

export NODE_PATH=.

echo "Removing build folder to have new build all clean and nice"
npm run clean 

echo "Create a new build folder"
npm run createbuild 

echo "Building client"
npm run buildclient

echo "Moving folders and files to build folder because build folder is then moved to the docker container"
mv client/build build/static

cp -R server build/server

mkdir -p build/client/src

cp -r client/src/common build/client/src

cp run.js build

cp package.json build

echo "Build finished"