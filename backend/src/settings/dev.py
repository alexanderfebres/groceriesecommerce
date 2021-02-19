from .base import *

DEBUG = True
ALLOWED_HOSTS += ["127.0.0.1"]

CORS_ORIGIN_ALLOW_ALL = True
WSGI_APPLICATION = 'src.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


