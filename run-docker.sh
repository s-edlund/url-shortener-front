#!/usr/bin/env bash

docker run -d --name url-shortener-front -p 80:80 --network=myNetwork url-shortener-front

