FROM python:3.8-slim

WORKDIR /app

# Install pip requirements
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5000

CMD ["flask", "run"]