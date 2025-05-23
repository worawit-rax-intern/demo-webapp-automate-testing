from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional
from datetime import date

if TYPE_CHECKING:
    from .user import User

class ArticleBase(SQLModel):
    title : str = Field(max_length=255)
    desciption : str = Field()
    published_at : date = Field()

class Article(ArticleBase, table=True):
    __tablename__ = "article"
    id : int = Field(primary_key=True)

    user_id : str = Field(foreign_key="user.email")
    publisher : Optional["User"] = Relationship(back_populates="articles")

class ArticlePublic(SQLModel):
    id : int

class ArticleCreate(ArticleBase):
    pass

class ArticleUpdate(SQLModel):
    title : str | None = None
    desciption : str | None = None
    published_at : date | None = None
    publisher : Optional["User"] = None