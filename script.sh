#!/bin/bash

echo Cleaning...
-rf ./build

if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)


echo Building app
npm run build

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi


cat > ./build/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

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

cat > ./.env << _EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

cp ./Dockerfile ./build/
cp ./dockerrunscript.sh ./build/

cd build

echo Building docker image

sudo docker build -t vediserna/tictactoe:$GIT_COMMIT .

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

sudo docker push vediserna/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "Moving .env folder"
scp -i ~/Documents/keys/my-ec2-key-pair-vediserna.pem ~/Documents/reference-tictactoe/.env ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.


echo "Moving docker-compose.yml"
scp -i ~/Documents/keys/my-ec2-key-pair-vediserna.pem ~/Documents/reference-tictactoe/docker-compose.yml ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com:~/.

export GIT_COMMIT

echo "Entering AWS computer"
ssh -i ~/Documents/keys/my-ec2-key-pair-vediserna.pem ec2-user@ec2-54-191-32-51.us-west-2.compute.amazonaws.com < ../provisioning/amazonscript.sh

echo "Done"