GOPATH := $(PWD)
FORGLORY_IMAGE := egorand/prismo:forglory-frontend

build:
	docker build -t $(FORGLORY_IMAGE) .

run: build
	docker run -d -p 9900:3000 --name forglory-frontend $(FORGLORY_IMAGE)

stop: ## Stops all the running containers
	#docker stop $$(docker ps -a -q)
	docker stop forglory

kill: stop ## Kills all the running containers
	#docker rm $$(docker ps -a -q)
	docker rm forglory

clean-images: kill ## Deletes all docker images
	docker rmi -f $$(docker images -q)

push:
	docker push $(FORGLORY_IMAGE)

logs:
	docker logs forglory
