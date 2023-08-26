from datetime import datetime
from uuid import uuid4
import os

from dotenv import load_dotenv
import motor.motor_asyncio

from model import Todo, TodoCreate, TodoUpdate

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

database = client[DATABASE_NAME]
collection = database[COLLECTION_NAME]


async def create_todo(todo: TodoCreate):
    todo = dict(todo)
    todo["id"] = str(uuid4())
    todo["created_at"] = datetime.utcnow()
    todo["completed"] = False

    result = await collection.insert_one(todo)
    created_todo = await collection.find_one({"_id": result.inserted_id})
    return created_todo


async def get_todos():
    cursor = collection.find({})
    todos = [Todo(**document) async for document in cursor]
    return todos


async def get_todo(id: str):
    todo = await collection.find_one({"id": id})
    return todo


async def update_todo(id: str, todo: TodoUpdate):
    todo = dict(todo)
    await collection.update_one(
        {"id": id},
        {"$set": todo}
    )
    updated_todo = await collection.find_one({"id": id})
    return updated_todo


async def delete_todo(id: str):
    result = await collection.delete_one({"id": id})
    return result
