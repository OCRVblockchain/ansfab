#!/bin/bash

ELASTICSEARCH_CONTAINER_NAME=elasticsearch
FILE_INDEX=./index.json

if [ ! "$(docker ps -a | grep $ELASTICSEARCH_CONTAINER_NAME)" ]; then
  echo "elasticsearch is not running";
  exit 1;
fi

if [ ! -f "$FILE_INDEX" ]; then
    echo "$FILE_INDEX does not exist";
fi

docker cp $FILE_INDEX $ELASTICSEARCH_CONTAINER_NAME:/var/tmp
docker exec -it $ELASTICSEARCH_CONTAINER_NAME bash -c "curl -X PUT http://localhost:9200/rails \
                                                      -H 'Content-Type: application/json' \
                                                      -d @/var/tmp/index.json"

