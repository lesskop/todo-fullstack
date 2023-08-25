from datetime import datetime
import os

from dotenv import load_dotenv
import motor.motor_asyncio

from model import CreateTodoItem, TodoItem

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client[DATABASE_NAME]
collection = database[COLLECTION_NAME]


async def get_all_todos():
    cursor = collection.find({})
    todos = [TodoItem(**document) async for document in cursor]
    return todos


async def get_todo(title: str):
    document = await collection.find_one({'title': title})
    return document


async def create_todo(todo: CreateTodoItem):
    todo_dict = dict(todo)
    todo_dict["created_at"] = datetime.utcnow()
    todo_dict["completed"] = False

    result = await collection.insert_one(todo_dict)
    created_todo = await collection.find_one({'_id': result.inserted_id})
    return TodoItem(**created_todo)


async def update_todo(title: str, description: str):
    update_query = {
        '$set': {
            'description': description,
        }
    }

    await collection.update_one({"title": title}, update_query)
    updated_todo = await collection.find_one({'title': title})
    if updated_todo:
        return TodoItem(**updated_todo)


async def delete_todo(title: str):
    await collection.delete_one({'title': title})
    return True


async def complete_todo(title: str):
    update_query = {
        '$set': {
            'completed': True,
        }
    }

    await collection.update_one({"title": title}, update_query)
    document = await collection.find_one({'title': title})
    return TodoItem(**document) if document else None
