FROM python:3.11-alpine

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV MONGO_URL=mongodb://todo-mongo:27017
ENV DATABASE_NAME=todo_app
ENV COLLECTION_NAME=todo_items

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
