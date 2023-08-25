from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import CreateTodoItem, TodoItem
import database

app = FastAPI(title='Todo')

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/api/todo')
async def get_all_todos():
    response = await database.get_all_todos()
    return response


@app.get('/api/todo/{title}', response_model=TodoItem)
async def get_todo(title: str):
    response = await database.get_todo(title)
    if response:
        return response
    raise HTTPException(404, f'Todo item with title="{title}" does not exist')


@app.post('/api/todo', response_model=TodoItem)
async def create_todo(todo: CreateTodoItem):
    response = await database.create_todo(dict(todo))

    if response:
        return response
    raise HTTPException(400, 'Something went wrong')


@app.put('/api/todo/{title}', response_model=TodoItem)
async def update_todo(title: str, description: str):
    response = await database.update_todo(title, description)
    if response:
        return response
    raise HTTPException(404, f'Todo item with title="{title}" does not exist')


@app.delete('/api/todos/{title}')
async def delete_todo(title: str):
    response = await database.delete_todo(title)
    if response:
        return f"Todo item with title='{title}' was deleted"
    raise HTTPException(404, f'Todo item with title="{title}" does not exist')


@app.put('/api/todo/{title}/complete', response_model=TodoItem)
async def complete_todo(title: str):
    response = await database.complete_todo(title)
    if response:
        return response
    raise HTTPException(404, f'Todo item with title="{title}" does not exist')
