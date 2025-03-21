#!/bin/bash

# Définir les variables d'environnement
POSTGRES_USER=omar-test
POSTGRES_PASSWORD=omar123-test
POSTGRES_DB=django_db-test

echo "Configuration PostgreSQL :"
echo " - Utilisateur : $POSTGRES_USER"
echo " - Base de données : $POSTGRES_DB"

# Créer l'utilisateur et la base de données si nécessaire
echo "Création de l'utilisateur et de la base de données PostgreSQL..."
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';" || echo "L'utilisateur existe déjà ou une erreur s'est produite."
PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB WITH OWNER $POSTGRES_USER;" || echo "La base de données existe déjà ou une erreur s'est produite."

# Attendre que PostgreSQL soit prêt
MAX_RETRIES=10
RETRY_COUNT=0
until PGPASSWORD=$POSTGRES_PASSWORD psql -h db -U $POSTGRES_USER -d $POSTGRES_DB -c '\q'; do
    RETRY_COUNT=$((RETRY_COUNT+1))
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo "PostgreSQL n'est pas prêt après $MAX_RETRIES tentatives. Abandon."
        exit 1
    fi
    echo "Attente que PostgreSQL soit prêt... (Tentative $RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

# Exécuter les migrations
echo "Création des migrations..."
if ! python manage.py makemigrations; then
    echo "Échec de la création des migrations."
    exit 1
fi

echo "Application des migrations..."
if ! python manage.py migrate; then
    echo "Échec de l'application des migrations."
    exit 1
fi

# Lancer Gunicorn
echo "Démarrage de Gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 celeryRedis.wsgi:application