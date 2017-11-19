GOPATH := $(PWD)
FORGLORY_ROOT := $(GOPATH)/src/forglory
FORGLORY_IMAGE := egorand/prismo:forglory-server
FORGLORY_SOURCES := $(shell find $(FORGLORY_ROOT) -type f -name *.go)

build:
	docker build -t $(FORGLORY_IMAGE) .

run: build
	docker run -d -p 9000:8000 -w /go/src/forglory --name forglory $(FORGLORY_IMAGE)

stop: ## Stops all the running containers
	#docker stop $$(docker ps -a -q)
	docker stop forglory

kill: stop ## Kills all the running containers
	#docker rm $$(docker ps -a -q)
	docker rm forglory

clean-images: kill ## Deletes all docker images
	docker rmi -f $$(docker images -q)

goshell: ## Open bash under go docker container
	docker run -it -v $(GOPATH):/go -w /go/src $(FORGLORY_IMAGE) /bin/bash

cmd:
	docker run --rm -v $(GOPATH):/go -w /go/src $(FORGLORY_IMAGE) bash -c "$(COMMAND)"

push:
	docker push $(FORGLORY_IMAGE)

run-db:
	docker run --name mysql -e MYSQL_ROOT_PASSWORD=somepassword -p 3306:3306 -d mysql:latest

logs:
	docker logs forglory
