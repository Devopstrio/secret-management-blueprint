from typing import List, Dict
from datetime import datetime

class PolicyEngine:
    """Evaluates access control policies for secret retrieval."""
    
    def __init__(self):
        self.policies = {
            "admin": ["*"],
            "app_server": ["secrets/prod/*", "secrets/common/*"],
            "developer": ["secrets/dev/*"]
        }

    def evaluate_access(self, role: str, path: str) -> bool:
        allowed_paths = self.policies.get(role, [])
        for pattern in allowed_paths:
            if pattern == "*": return True
            if path.startswith(pattern.replace("*", "")):
                return True
        return False

class AuditLogger:
    """Centralized immutable logging for all secret interactions."""
    
    def log_access(self, user_id: str, secret_path: str, action: str, status: str):
        print(f"[{datetime.utcnow().isoformat()}] [AUDIT] User: {user_id} | Path: {secret_path} | Action: {action} | Status: {status}")

class GovernanceHub:
    """Monitors secret hygiene and compliance status."""
    
    def calculate_risk_score(self, secrets_metadata: List[Dict]) -> float:
        # Score based on age and lack of rotation
        total_risk = 0.0
        for secret in secrets_metadata:
            age_days = (datetime.utcnow() - datetime.fromisoformat(secret["last_rotated"])).days
            if age_days > 90: total_risk += 10
            if age_days > 180: total_risk += 20
        return min(100.0, total_risk)
