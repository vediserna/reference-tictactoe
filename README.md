## Application base for HGOP 2016 Student project

Global installation requirements:

nodejs version 6.9.1
https://nodejs.org/en/

optional: yarn for package management (server only).
https://yarnpkg.com/


nodemon for watching server and restarting on modifications.
```
npm install -g nodemon
```


For developing React single-page-app:

```
npm install -g create-react-app
```


## Getting started:

In project root directory:

```
yarn install (or npm install)
nodemon run.js
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

