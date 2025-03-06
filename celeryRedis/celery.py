from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Définir le module de configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'celeryRedis.settings')

# Instancier Celery
app = Celery('celeryRedis')

# Charger la configuration depuis Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Découvrir automatiquement les tâches définies dans les apps Django
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
