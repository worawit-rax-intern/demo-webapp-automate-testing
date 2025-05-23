from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional

from .role import Role
from .article import Article
# if TYPE_CHECKING:


class UserBase(SQLModel):
    name : str = Field(max_length=100)
    lastname : str = Field(max_length=100)

class User(UserBase, table=True):
    __tablename__ = "user"
    email : str = Field(primary_key=True)
    password : str = Field(max_length=100)
    
    role : Optional[int] = Field(default=None,foreign_key="role.id")
    role_relationship : Optional["Role"] = Relationship(back_populates="user_relationship")

    articles : Optional[list["Article"]] = Relationship(back_populates="publisher")

class UserPublic(UserBase):
    email : str
    role : int

class UserCreate(UserBase):
    email : str
    password : str

class UserUpdate(SQLModel):
    name : str | None = None
    lastname : str | None = None
    email : str | None = None
    password : str | None = None
    role : Optional["Role"] = None