from typing import Optional
from datetime import datetime

from pydantic import BaseModel


class CreateTodoItem(BaseModel):
    title: str
    description: Optional[str] = None


class TodoItem(CreateTodoItem):
    created_at: datetime
    completed: bool = False
