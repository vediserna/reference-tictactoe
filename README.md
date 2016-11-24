## Application base for HGOP 2016 Student project

Global installation requirements:

nodejs version 6.9.1
https://nodejs.org/en/

optional: yarn for package management (server only).
https://yarnpkg.com/

Add ./node_modules/.bin to your path. This enables to you to run locally installed npm commands.

nodemon for watching server and restarting on modifications.
```
npm install -g nodemon
```


For developing React single-page-app (optional):

```
npm install -g create-react-app
```


## Getting started:

Install and run postgres docker image for development.
```
docker run -p 5432:5432 --name pg2 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

In project root directory:

```
yarn install (or npm install)

npm run migratedb

npm run start
```

To run server side tests in watch mode (in another terminal window):
```
npm run test
```



In another terminal window:
```
cd client
npm run start
```

At this point you should be able to point your browser to http://localhost:8080/

To run client tests in watch mode:
```
cd client
npm run test
```

