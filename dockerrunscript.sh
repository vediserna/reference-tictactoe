#!/bin/bash

set -e

sleep 10

echo "Connecting to database.."
npm run migratedb-prod

node run.js

exit 0