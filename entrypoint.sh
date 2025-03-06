#!/bin/bash

#Attendre que postgres soit prêt
until psql -h db -U omar -d django_db -c '\q'; do
    echo "Attendre que postgres soit prêt..."
    sleep 2
done

#Executer les migrations
python manage.py makemigrations
python manage.py migrate

#Lancer le serveur
exec gunicorn --bind 0.0.0.0:8000 celeryRedis.wsgi:application