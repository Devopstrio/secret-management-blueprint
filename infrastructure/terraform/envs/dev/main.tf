module "secrets_db" {
  source = "./modules/database"

  db_name = "secret_management_vault"
}

module "secrets_cache" {
  source = "./modules/redis"

  cluster_mode = false
}

module "secrets_monitoring" {
  source = "./modules/monitoring"

  retention_days = 365
}

resource "kubernetes_namespace" "security_systems" {
  metadata {
    name = "secret-management"
    labels = {
      "security.ops/managed" = "true"
    }
  }
}

resource "kubernetes_config_map" "vault_configs" {
  metadata {
    name      = "vault-workload-configs"
    namespace = kubernetes_namespace.security_systems.metadata[0].name
  }

  data = {
    "default-ttl"        = "3600"
    "rotation-enabled"   = "true"
    "audit-level"        = "high"
  }
}
