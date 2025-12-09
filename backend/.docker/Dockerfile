FROM python:3.12-alpine

ENV PYTHONUNBUFFERED=1
ENV SSL_CERT_FILE=/usr/local/lib/python3.12/site-packages/certifi/cacert.pem

RUN sed -i 's/https:/http:/g' /etc/apk/repositories \
   && apk add --no-cache \
   gcc \
   musl-dev \
   libffi-dev \
   openssl-dev \
   python3-dev \
   build-base \
   curl \
   tzdata \
   mariadb-connector-c-dev \
   ca-certificates \
   postgresql16-client \
   && update-ca-certificates

WORKDIR /app
COPY ../README.md /app/README.md

# Poetryインストール
RUN pip install --upgrade pip \
    && pip install poetry

# Poetryの設定（仮想環境を作らずグローバルにインストール）
ENV POETRY_VIRTUALENVS_CREATE=false

# pyproject.tomlとpoetry.lockをコピー
COPY backend/pyproject.toml backend/poetry.lock* /app/

# 依存関係インストール
RUN poetry install --no-interaction --no-ansi

# アプリ本体をコピー
COPY backend/ /app/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]