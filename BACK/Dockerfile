FROM python:3.11.5

WORKDIR /config

ENV POETRY_VERSION=1.6.1 \
    PATH="/root/.local/bin:$PATH"

RUN apt-get update && apt-get -y install curl

# Официальный способ установки poetry
# Этот способ позволяет poetry изолировать его зависимости от наших зависимостей.
RUN pip install --upgrade pip  \
    && curl -sSL https://install.python-poetry.org | python3  \
    && poetry config virtualenvs.create false \
    && poetry --version

# Копирование зависимостей poetry в контейнер
COPY poetry.lock pyproject.toml /config/

# Установка poetry
RUN poetry install --no-dev

# Копируем код приложения в контейнер
COPY . .
