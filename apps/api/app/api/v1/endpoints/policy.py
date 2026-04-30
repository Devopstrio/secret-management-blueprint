from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def get_policy():
    return {'status': 'ok', 'component': 'policy'}
