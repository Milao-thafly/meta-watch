#!/bin/sh
set -e

# 1. On s'assure que les node_modules appartiennent à metawatch
# Note : Ceci doit être fait en tant que root au démarrage
if [ -d "/app/node_modules" ]; then
    chown -R 1000:1000 /app/node_modules
fi

# 2. Si le dossier est vide, on installe (pour le premier lancement)
if [ ! -d "/app/node_modules/vite" ]; then
    npm install
fi

# 3. On lance l'application en tant qu'utilisateur metawatch
# On utilise 'su-exec' ou 'gosu' si disponible, sinon on utilise 'su'
exec su - metawatch -c "cd /app && npm run dev -- --host 0.0.0.0 --port 3000"