# ==============================================================================
# Script Name : Makefile (Main target: deploy)
# Objective   : Deploy the application (Symfony Backend / Node Frontend)
# Prerequisites:
#   - Docker & Docker Compose
#   - Network access (for Composer/NPM)
#   - Ports 80, 5173, and 3306 must be available
#
# Steps :
#   1. Dependency check (Git config / Composer / NPM)
#   2. Project build (Docker Build)
#   3. Database initialization (Create / Sync Storage)
#
# Error handling:
#   - Process stops immediately (native Make behavior)
#   - Specific error message displayed for each command
# ===================================================================

ENV_FILE = $(CURDIR)/Backend/.env.local
DOCKER_COMPOSE = docker compose -p meta-watch --env-file $(ENV_FILE) -f docker-compose.yml -f docker-compose.override.yml
DOCKER_COMPOSE_PREPROD = docker compose -p meta-watch --env-file $(ENV_FILE)
USER_ID = $(shell id -u)
GROUP_ID = $(shell id -g)

help:
	@echo ""
	@echo "if you want to use this deployment take a look at the variable it the top of help section. We have initialised a variable DOCKER_COMPOSE who launch the command: \"docker compose -p meta-watch\" the section deployment call The global variable and start a build and permise to wait 10 seconds with a message from a echo."
	@echo "next exec -T backend git config --global --add safe.directory"
	@echo "this command is asked for asking git to make a safe configuration in your directory. If an user want to do some operations in the repository this configuration will stop the user that is not conected with the the acount of the repository."
	@echo "exec -T backend composer install"
	@echo "Installation of composer. That a package manager that allows you to install with command line packages for php"
	@echo "Create the database with doctrine if this one is not created"
	@echo "exec -T backend php bin/console doctrine:migrations:sync-metadata-storage"
	@echo "Synchronisation of data with doctrine when you have to much migration in waiting or dump a database this command watch your entity and synchronise as best as he can the data."
	@echo "exec -T frontend sh -c \"cd /app && npm install\""
	@echo "@echo \"Project ready !\""
	@echo Ask a shell for prompting cd for navigate in /app if we finished in app we can make npm install for install all the dependencies needed and un node_module folder"
	@echo "the build section will ask to remove and recreate an newer image"
	@echo "up -d --build"
	@echo "down -v"
	@echo "delete image and rebuild one -v allow me to make a connection between my image and my local machine"
	@echo "[ -f ./Backend/.env.backup ] && cp ./Backend/.env.backup ./Backend/.env || echo \"No backup Backend\""
	@echo "[ -f ./Frontend/.env.backup ] && cp ./Frontend/.env.backup ./Frontend/.env || echo \"No backup Frontend\""
	@echo "Search backend and frontend if the command pass you copy the last folder if the command fail you echo no backup"
	@echo ""
	@echo "Available commands:"
	@echo " make build      : Build and start containers"
	@echo " make deploy     : Full installation (Build + Deps + Migration)"
	@echo " make stop       : Stop containers"
	@echo " make sf-console : Direct access to Symfony console (e.g., make sf-console c=debug:router)"
	@echo " make clean      : Clean up caches and volumes"

deploy:
	@if [ ! -f $(ENV_FILE) ]; then echo "ERREUR: Fichier .env.local introuvable à $(ENV_FILE)"; exit 1; fi
	$(DOCKER_COMPOSE) up -d --build || { echo "Erreur de déploiement."; exit 1; }
	@echo "Attente de MySQL..."
	sleep 15
	$(DOCKER_COMPOSE) exec -T backend git config --global --add safe.directory /var/www/html
	@echo "--- DIAGNOSTIC SYSTEME ---"
	$(DOCKER_COMPOSE) exec -T backend sh -c "mkdir -p /var/www/html/vendor && echo 'SUCCESS' || (echo 'ECHEC: ' && ls -ld /var/www/html && id)"
	$(DOCKER_COMPOSE) exec -T -u metawatch backend composer install --no-interaction --prefer-dist
	$(DOCKER_COMPOSE) exec -T backend php bin/console doctrine:database:create --if-not-exists
	$(DOCKER_COMPOSE) exec -T backend php bin/console doctrine:migrations:migrate --no-interaction
	@echo "Project ready !" 

deploy-preprod:
	$(DOCKER_COMPOSE) up -d --build || { echo "Erreur de déploiement."; exit 1; }
	@echo "Attente de MySQL (Preprod)..."
	sleep 15
	$(DOCKER_COMPOSE_PREPROD) exec -T backend git config --global --add safe.directory /var/www/html
	$(DOCKER_COMPOSE_PREPROD) exec -T -u metawatch backend composer install --no-interaction --prefer-dist
	$(DOCKER_COMPOSE_PREPROD) exec -T backend php bin/console doctrine:database:create --if-not-exists
	$(DOCKER_COMPOSE_PREPROD) exec -T backend php bin/console doctrine:migrations:migrate --no-interaction
	@echo "Project ready (Preprod)!"

build:
	$(DOCKER_COMPOSE) up -d --build

stop:
	$(DOCKER_COMPOSE) stop

clean:
	$(DOCKER_COMPOSE) down -v --remove-orphans

sf-console:
	$(DOCKER_COMPOSE) exec backend php bin/console $(c)

rollback:
	@echo "Critical error detected : start a rollback..."
	$(DOCKER_COMPOSE) down -v
	[ -f ./Backend/.env.backup ] && cp ./Backend/.env.backup ./Backend/.env || echo "No backup Backend"
	[ -f ./Frontend/.env.backup ] && cp ./Frontend/.env.backup ./Frontend/.env || echo "No backup Frontend"
	$(DOCKER_COMPOSE) up -d
	@echo "The system was recreated in is initial state."