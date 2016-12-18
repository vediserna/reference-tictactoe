1. Jenkins URL and username and password.
http://82.221.49.116:8080/
username: hgop
passw: hgop542

2. Game URL (AWS)
 http://54.191.32.51/

## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- Docker build
Dockerfile

- Docker compose
docker-compose.yml

- AWS Provisioning 
provisioning/amazonscript.sh
does docker-compose down and the up again, I know I shouldn't refresh the db like that but I ran out of time

- Other scripts
build.sh
    triggered when npm run build is run
buildscript.sh
    builds the project in jenkins
commit.sh
    gets the GIT_COMMIT variable and moves files to build that are needed in order to run on AWS. Then it builds and pushes a new docker container with the new GIT_COMMIT as a tag
deploy.sh
    moves files to the AWS and then runs the amazonscript.sh on the AWS
dockerrunscript.sh
    script that is run when my container is started
setupscript.sh
    installs dependencies in jenkins
tests.sh
    runs the tests in jenkins

## Testing & logic

Outline what tests you created.

- UnitTests, server logic TDD (Git commit log)
    I implemented UnitTests in server/socket-app/tictactoe/tictactoe-game.spec.js
    I did this TDD

- API Acceptance test - fluent API
    I did acceptance tests in apitest/tictactoe.spec.js

- Load test loop
    I did load tests in apitest/tictactoe.loadtest.js

- UI TDD
    No

- Is the game playable?
    No


## Data migration

Did you create a data migration.

- Migration up and down
    I'm not sure... at least I have npm run migratedb-dev and npm run migratedb-prod :)


## Jenkins

Do you have the following Jobs and what happens in each Job:

- Commit Stage
    Yes, but it is called hgop_tictactoe

- Acceptance Stage
    Yes, but it is called Acceptance_test_stage

- Capacity Stage
    Yes, but it is called Capacity_testing

- Other
    Deployment


Did you use any of the following features in Jenkins?

- Schedule or commit hooks
    Commit hooks, every time I push to github, hgop_tictactoe(Commit Stage) starts a build

- Pipeline
    Yes, Jobs are triggered after other successful jobs

- Jenkins file
    No

- Test reports
    Yes, in hgop_tictactoe(Commit Stage)

- Other


## Monitoring

Did you do any monitoring?

- URL to monitoring tool. Must be open or include username and pass.
No

## Other

Anything else you did to improve you deployment pipeline of the project itself?
No, I didn't really have much time to do alot. And then, ofc, my project fell apart 24 hours before handin and I did not have time to fix everything since I made plans on the 18th over a month ago. I really hope that my code will be evaluated over the functionality of the end result :)