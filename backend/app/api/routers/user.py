from fastapi import APIRouter
from models.user import UserCreate, UserUpdate, UserPublic
from services.user import read_users_service, create_user_service
from core.database import SessionDep

router = APIRouter(
    prefix="/users"
)

@router.get("/", response_model=list[UserPublic])
def read_users(session: SessionDep):
    return read_users_service(session)

@router.post("/", response_model=UserPublic)
def create_user(user: UserCreate, session: SessionDep):
    return create_user_service(session, user)
