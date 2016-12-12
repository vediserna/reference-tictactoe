#!/bin/bash

echo "     ____________"
echo "*~*~|  Building  |~*~*"
echo "    |____________|"

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