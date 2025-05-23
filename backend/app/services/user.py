from core.database import SessionDep
from sqlmodel import select
from models.user import User

def read_users_service(session: SessionDep):
    query = select(User)
    return session.exec(query).all()