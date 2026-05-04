# ==============================================================================
# Nom du script : Makefile (Cible principale : deploy)
# Objectif     : Déployer l'application (Backend Symfony / Frontend Node)
# Pré-requis   :
#   - Docker & Docker Compose
#   - Accès réseau (pour Composer/NPM)
#   - Ports 80, 5173 et 3306 libres
#
# Étapes :
#   1. Vérification des dépendances (Git config / Composer / NPM)
#   2. Construction du projet (Docker Build)
#   3. Initialisation Base de données (Create / Sync Storage)
#
# En cas d'erreur :
#   - Le processus s'arrête immédiatement (comportement natif de Make)
#   - Un message d'erreur spécifique à la commande est affiché
# ====================================================================


DOCKER_COMPOSE = docker compose -p meta-watch

help:
		@echo "Commandes disponibles :"
		@echo " make build		:Construit et lance les conteneurs"
		@echo " make deploy		:Installation complète (Build + Deps + Migration"
		@echo " make stop 		: Arrête les conteneurs"
		@echo " make sf-console	: Accès direct à la console Symfony (ex: make sf-console c=debug:router)"
		@echo " make clean		: Nettoie les caches et les volumes"

deploy:
		$(DOCKER_COMPOSE) up -d --build
		@echo "Attente de MySQL..."
		sleep 10
		$(DOCKER_COMPOSE) exec -T backend git config --global --add safe.directory /var/www/html
		$(DOCKER_COMPOSE) exec -T backend cp .env.example .env
		$(DOCKER_COMPOSE) exec -T backend composer install
		$(DOCKER_COMPOSE) exec -T backend php bin/console doctrine:database:create --if-not-exists
		$(DOCKER_COMPOSE) exec -T backend php bin/console doctrine:migrations:sync-metadata-storage
		$(DOCKER_COMPOSE) exec -T frontend sh -c "cd /app && npm install"
		@echo "Projet prêt !" 

build:
		$(DOCKER_COMPOSE) up -d --build

stop:
		$(DOCKER_COMPOSE) stop

clean:
		$(DOCKER_COMPOSE) down -v --remove-orphans

sf-console:
		$(DOCKER_COMPOSE) exec backend php bin/console $(c)