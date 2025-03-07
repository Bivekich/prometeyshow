#!/bin/bash

COMPOSE="/usr/local/bin/docker-compose --no-ansi"
DOCKER="/usr/bin/docker"

cd /root/prometeyshow/
$COMPOSE run certbot renew --force-renewal
$COMPOSE kill -s SIGHUP nginx

exit 0
