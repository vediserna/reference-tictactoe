#!/bin/bash
npm install -g nodemon
npm install -g create-react-app

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

echo "     _________________"
echo "*~*~|  Running tests  |~*~*"
echo "    |_________________|"
./tests.sh

echo Cleaning...
-rf ./build

if [ -z "$GIT_COMMIT" ]; then
  echo "getting values for GIT_COMMIT and GIT_URL"
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

echo "Removing .git from url in order to get https link to repo"
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

echo Building app
npm run build

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi

echo "Done"