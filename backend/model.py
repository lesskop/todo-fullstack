from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class TodoCreate(BaseModel):
    title: str
    description: Optional[str]


class Todo(TodoCreate):
    id: UUID | str
    created_at: datetime
    completed: bool = False


class TodoUpdate(TodoCreate):
    completed: bool = False
