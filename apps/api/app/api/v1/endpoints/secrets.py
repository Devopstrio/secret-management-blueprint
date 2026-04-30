from fastapi import APIRouter, Body
router = APIRouter()
@router.get('/')
def list_secrets():
    return {'secrets': [{'path': 'db/prod', 'version': 'v1', 'last_rotated': '2024-04-30'}]}
@router.post('/access')
def access_secret(data: dict = Body(...)):
    return {'status': 'GRANTED', 'lease_id': 'lease-9942'}
