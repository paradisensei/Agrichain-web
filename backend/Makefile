#########
#ACTIONS#
#########

build:
	docker build -t h4c-express .

start:
	docker run -p 80:3025 -p 5001:5001 --name h4cexpress h4c-express

stop:
	docker stop h4cexpress

clean: stop
	docker h4cexpress


########
#SHELLS#
########

shell-web:
	docker exec -ti h4cexpress bash

log-web-live:
	docker logs --tail 50 --follow --timestamps h4cexpress
