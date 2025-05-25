from core.database import SessionDep
from sqlmodel import select
from models.user import User, UserCreate
from services.auth import get_password_hash

def read_users_service(session: SessionDep):
    query = select(User)
    return session.exec(query).all()

def create_user_service(session: SessionDep, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        name=user.name,
        lastname=user.lastname,
        password=hashed_password,
        role=user.role
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user