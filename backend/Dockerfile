FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app/api

# ADD . /app/api

COPY ./izzikg .
COPY ./izzikg/src/requirements.txt .
COPY ./izzikg/src/dev_requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip install -r dev_requirements.txt




CMD ['sh', 'app/api/backend/izzikg/src/postgres_config.sh']
CMD ['sh', 'app/api/backend/izzikg/src/entrypoint.sh']
COPY . /
