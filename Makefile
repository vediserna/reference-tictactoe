ifndef TAG
  #needs to be a project stored in git, gets the short commit sha
	TAG := $(shell git rev-parse --short HEAD)
endif
ifndef PROJECT_NAME
  #Change to the name of you project
	PROJECT_NAME := tictactoe
endif
ifndef USERNAME
  #Change  to your dockerhub username
	USERNAME := vediserna
endif
ifndef IMAGE_TAG
  #Change <username> to your dockerhub username
	IMAGE_TAG := ${USERNAME}/${PROJECT_NAME}:${TAG}
endif

build:
	docker build -t ${IMAGE_TAG} .
run:
	docker run -p "3000:3000" -d ${IMAGE_TAG}
docker-test:
	#add '--net host' if you want to connect to redis container runnin in another container on host or use docker compose with the ' command: 'npm test' '
	docker run -it ${IMAGE_TAG} npm test
redis:
	#-v flag for starting with persistent storage
	docker run -d -p "6379:6379" -v "${PWD}/redis:/data redis"
compose:
	docker-compose up -d --build