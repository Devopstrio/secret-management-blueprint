from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, secrets, policy, audit, metrics
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(secrets.router, prefix="/secrets", tags=["secrets"])
api_router.include_router(policy.router, prefix="/policy", tags=["policy"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["metrics"])
