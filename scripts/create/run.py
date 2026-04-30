import sys
import argparse
from core.encryption.engine import EncryptionEngine, SecretStorage, RotationEngine

def run_secret_simulation(secret_name: str, secret_val: str):
    # 1. Initialize Engine
    enc = EncryptionEngine("master-key-simulation-1234")
    storage = SecretStorage(enc)
    rot = RotationEngine(storage)
    
    # 2. Store Secret
    print(f"--- Secret Management Platform Intelligence Simulation ---")
    print(f"Action: Creating Secret [{secret_name}]")
    
    version = storage.store_secret(secret_name, secret_val, "kv-prod")
    
    # 3. Access
    retrieved = storage.get_secret(secret_name, "kv-prod")
    
    print(f"\n--- Storage Results ---")
    print(f"[DATA] Secret Name: {secret_name}")
    print(f"[DATA] Version ID: {version}")
    print(f"[DATA] Plaintext: {retrieved}")
    
    # 4. Rotation
    print(f"\n[ACTION] Triggering Rotation for {secret_name}...")
    rot.rotate_secret(secret_name, "kv-prod")
    
    new_retrieved = storage.get_secret(secret_name, "kv-prod")
    print(f"[DATA] Rotated Plaintext: {new_retrieved}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", default="db_admin_password")
    parser.add_argument("--value", default="super-secret-pw-123")
    args = parser.parse_args()
    run_secret_simulation(args.name, args.value)
