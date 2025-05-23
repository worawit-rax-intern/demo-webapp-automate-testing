from fastapi import APIRouter
from services import root

router = APIRouter()

@router.get("/")
async def read_root():
    return root.read_root_service()