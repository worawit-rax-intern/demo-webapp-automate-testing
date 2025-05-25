from fastapi import FastAPI
from api.routers import root, user, auth
from core.database import create_db_and_tables

app = FastAPI()

# connect database with fastAPI
app.add_event_handler("startup",create_db_and_tables)

# route api
app.include_router(root.router)
app.include_router(user.router)
app.include_router(auth.router)