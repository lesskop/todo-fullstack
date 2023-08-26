from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from model import Todo, TodoCreate, TodoUpdate
import database

app = FastAPI(title='Todo')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.post("/todo/", response_model=Todo)
async def create_todo(todo: TodoCreate):
    created_todo = await database.create_todo(todo)
    return created_todo


@app.get("/todo/", response_model=List[Todo])
async def get_todos():
    todos = await database.get_todos()
    if todos is None:
        raise HTTPException(status_code=404, detail="Todos not found")
    return todos


@app.get("/todo/{id}", response_model=Todo)
async def get_todo(id: str):
    todo = await database.get_todo(id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo


@app.put("/todo/{id}", response_model=Todo)
async def update_todo(id: str, todo: TodoUpdate):
    await database.update_todo(id, todo)
    updated_todo = await database.get_todo(id)
    if updated_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return updated_todo


@app.delete("/todo/{id}", response_model=str)
async def delete_todo(id: str):
    todo = await database.delete_todo(id)
    if todo.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    return "Todo was deleted"
