import base64
import os
import uuid
import hashlib
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta

class EncryptionEngine:
    """Simulates AES-like encryption for secrets at rest."""
    
    def __init__(self, master_key: str):
        self.master_key = hashlib.sha256(master_key.encode()).digest()

    def encrypt(self, plain_text: str) -> str:
        # Mock encryption: base64 + XOR with master key
        key = self.master_key
        encrypted = "".join(chr(ord(c) ^ key[i % len(key)]) for i, c in enumerate(plain_text))
        return base64.b64encode(encrypted.encode()).decode()

    def decrypt(self, cipher_text: str) -> str:
        key = self.master_key
        decoded = base64.b64decode(cipher_text).decode()
        decrypted = "".join(chr(ord(c) ^ key[i % len(key)]) for i, c in enumerate(decoded))
        return decrypted

class SecretStorage:
    """Handles secure storage and retrieval of encrypted secrets."""
    
    def __init__(self, encryption_engine: EncryptionEngine):
        self.engine = encryption_engine
        self.vault = {}

    def store_secret(self, path: str, value: str, namespace: str = "default") -> str:
        encrypted_value = self.engine.encrypt(value)
        version_id = str(uuid.uuid4())
        
        if namespace not in self.vault:
            self.vault[namespace] = {}
            
        self.vault[namespace][path] = {
            "value": encrypted_value,
            "version": version_id,
            "created_at": datetime.utcnow().isoformat(),
            "last_rotated": datetime.utcnow().isoformat()
        }
        return version_id

    def get_secret(self, path: str, namespace: str = "default") -> Optional[str]:
        data = self.vault.get(namespace, {}).get(path)
        if data:
            return self.engine.decrypt(data["value"])
        return None

class LeaseManager:
    """Manages secret leases and time-to-live (TTL)."""
    
    def __init__(self):
        self.leases = {}

    def create_lease(self, secret_id: str, ttl_sec: int = 3600) -> str:
        lease_id = str(uuid.uuid4())
        expiry = datetime.utcnow() + timedelta(seconds=ttl_sec)
        self.leases[lease_id] = {
            "secret_id": secret_id,
            "expiry": expiry.isoformat(),
            "status": "ACTIVE"
        }
        return lease_id

    def is_lease_valid(self, lease_id: str) -> bool:
        lease = self.leases.get(lease_id)
        if not lease: return False
        return datetime.fromisoformat(lease["expiry"]) > datetime.utcnow()

class RotationEngine:
    """Orchestrates the automatic rotation of secrets."""
    
    def __init__(self, storage: SecretStorage):
        self.storage = storage

    def rotate_secret(self, path: str, namespace: str = "default"):
        current_val = self.storage.get_secret(path, namespace)
        if current_val:
            # Generate new random secret
            new_val = hashlib.sha256(os.urandom(32)).hexdigest()[:16]
            self.storage.store_secret(path, new_val, namespace)
            print(f"[ROTATION] Secret at {namespace}/{path} rotated successfully.")

if __name__ == "__main__":
    enc = EncryptionEngine("super-secret-master-key")
    store = SecretStorage(enc)
    rot = RotationEngine(store)
    
    # Store initial secret
    store.store_secret("db_pass", "p@ssword123", "prod")
    print(f"Decrypted: {store.get_secret('db_pass', 'prod')}")
    
    # Rotate secret
    rot.rotate_secret("db_pass", "prod")
    print(f"New Decrypted: {store.get_secret('db_pass', 'prod')}")
