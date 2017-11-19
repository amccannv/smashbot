FROM golang:1.9.1

WORKDIR /go

COPY . .

# add dependencies

RUN apt-get update && apt-get install -y \
	git \
	python \
	unzip \
	ca-certificates \
	curl

# Compile forglory

WORKDIR /go/src/forglory

RUN go-wrapper download
RUN go-wrapper install
CMD ["go-wrapper", "run"]

#RUN go build

# Run forglory

#CMD ["forglory"]
