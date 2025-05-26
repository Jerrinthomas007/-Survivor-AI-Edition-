from pydantic import BaseModel, constr
from typing import List

# User schemas
class UserCreate(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True

# Agent schemas
class AgentCreate(BaseModel):
    name: constr(max_length=100)
    character: constr(max_length=1000)

class AgentOut(AgentCreate):
    id: int

    class Config:
        orm_mode = True
