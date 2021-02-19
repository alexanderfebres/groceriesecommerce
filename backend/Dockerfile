FROM python:3.8.6-alpine3.11

ENV PYTHONUNBUFFERED 1
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1

WORKDIR /backend

COPY requirements.txt /backend/

RUN \
    apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev && \
    apk --update add libxml2-dev libxslt-dev libffi-dev gcc musl-dev libgcc openssl-dev curl && \
    apk add jpeg-dev zlib-dev freetype-dev lcms2-dev openjpeg-dev tiff-dev tk-dev tcl-dev && \
    python3 -m pip install --upgrade pip && \
    python3 -m pip install -r requirements.txt --no-cache-dir 


EXPOSE 8000
COPY . /backend/

CMD ["sh","-c", \
    "sleep 15 && \ 
    echo yes | python manage.py collectstatic --settings=src.settings.prod && \
    python manage.py makemigrations --settings=src.settings.prod && \
    python manage.py migrate --settings=src.settings.prod  &&  \
    echo \"from authentication.models import CustomUser; CustomUser.objects.filter(email='admin@example.com', is_superuser=True).delete(); \
    CustomUser.objects.create_superuser('admin@example.com', 'administrator', 'admin', 'nimda')\" | python manage.py shell --settings=src.settings.prod && \
    gunicorn src.wsgi.prod:application --bind 0.0.0.0:8000 --timeout 120 --workers=3 --threads=3 --worker-connections=1000"]
