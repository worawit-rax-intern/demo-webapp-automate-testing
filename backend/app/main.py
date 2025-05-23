from fastapi import FastAPI
from api.routers import root

app = FastAPI()

app.include_router(root.router)