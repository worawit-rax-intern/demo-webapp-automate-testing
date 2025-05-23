from sqlmodel import SQLModel, Field, Relationship
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from .user import User

class RoleBase(SQLModel):
    name: str = Field(index=True,max_length=100)

class Role(RoleBase, table=True):
    __tablename__ = "role"
    id: int = Field(primary_key=True)

    user_relationship: list["User"] = Relationship(back_populates="role_relationship")

class RolePublic(RoleBase):
    id: int

class RoleCreate(RoleBase):
    name: str

class RoleUpdate(RoleBase):
    name: str | None = None
    users: Optional[list["User"]] = None