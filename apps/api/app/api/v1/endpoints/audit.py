from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_audit():
    return {'status': 'ok', 'component': 'audit'}
