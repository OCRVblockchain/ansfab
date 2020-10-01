FROM python:3.7-alpine3.11
RUN mkdir python
WORKDIR /python
COPY ./python/index.py .
COPY ./python/entrypoint.sh .
RUN pip install elasticsearch
ENTRYPOINT ["./entrypoint.sh"]