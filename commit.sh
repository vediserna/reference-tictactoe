#!/bin/bash

echo "     ____________ "
echo "*~*~| Committing |~*~*"
echo "    |____________|"

echo Cleaning...
rm -rf ./dist

if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

echo "Saving GIT_COMMIT value to githash.txt"
cat > ./build/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

echo "Writing Git information(GITHUB_URL + GIT_COMMIT) to version.html"
cat > ./build/public/version.html << _EOF_
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

echo "saving GIT_COMMIT env"
cat > ./.env << _EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

echo "Copying Dockerfile to build folder so it will be in the docker container"
cp ./Dockerfile ./build/
echo "Copying dockerrunscript.sh to build folder so it will be in the docker container"
cp ./dockerrunscript.sh ./build/

cd build

echo "Building docker image"
docker build -t vediserna/tictactoe:$GIT_COMMIT .

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

echo "Pushing docker image to Dockerhub"
sudo docker push vediserna/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi