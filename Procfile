release: python manage.py migrate
api: gunicorn passwords.wsgi --log-file -
web: bin/boot
