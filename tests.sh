#!/bin/bash

echo "Running server tests..."
npm run test
rc=$?
if [[ $rc != 0 ]] ; then
    echo "npm run test failed with exit code " $rc
    exit $rc
fi

cd client
echo "Running client tests..."
npm run test
rc=$?
if [[ $rc != 0 ]] ; then
    echo "npm run test failed with exit code " $rc
    exit $rc
fi

