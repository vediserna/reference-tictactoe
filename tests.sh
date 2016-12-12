#!/bin/bash

echo "     _________________"
echo "*~*~|  Running tests  |~*~*"
echo "    |_________________|"

echo "Running server tests..."
npm run unittest
rc=$?
if [[ $rc != 0 ]] ; then
    echo "npm run test failed with exit code " $rc
    exit $rc
fi

cd client
echo "Running client tests..."
npm run unittest
rc=$?
if [[ $rc != 0 ]] ; then
    echo "npm run test failed with exit code " $rc
    exit $rc
fi
cd ..
