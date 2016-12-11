#!/bin/bash

echo "     ___________ "
echo "*~*~| Deploying |~*~*"
echo "    |___________|"

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
docker push vediserna/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "     __________________ "
echo "*~*~| Moving on to AWS |~*~*"
echo "    |__________________|"

echo "Copying .env folder to aws so GIT_COMMIT variable exists there with correct value"
scp -i ~/my-ec2-key-pair-vediserna.pem ~/workspace/hgop_tictactoe/.env ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

echo "Copying docker-compose.yml to aws"
scp -i ~/my-ec2-key-pair-vediserna.pem ~/workspace/hgop_tictactoe/docker-compose.yml ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

echo "Running amazonscript.sh on aws"
ssh -i ~/my-ec2-key-pair-vediserna.pem ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com < ../provisioning/amazonscript.sh