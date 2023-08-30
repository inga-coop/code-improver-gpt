FROM continuumio/miniconda3

RUN mkdir /app

WORKDIR /app

COPY environment.yml .

RUN apt-get update

RUN conda env update --name base --file environment.yml  --prune
