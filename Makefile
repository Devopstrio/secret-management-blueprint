.PHONY: help build up down test lint migrate create-secret rotate-secrets

help:
	@echo "Secrets Management Platform - Management Commands"
	@echo "------------------------------------------------"
	@echo "build              : Build all service containers"
	@echo "up                 : Start all services in the background"
	@echo "down               : Stop all services"
	@echo "test               : Run all tests (Unit + Integration)"
	@echo "lint               : Run linting checks"
	@echo "migrate            : Run database migrations"
	@echo "create-secret      : Create a sample encrypted secret"
	@echo "rotate-secrets     : Trigger automatic secret rotation"

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

test:
	pytest tests/unit tests/integration
	npm test --prefix apps/web

lint:
	flake8 apps/api apps/worker core
	npm run lint --prefix apps/web

migrate:
	docker-compose exec api alembic upgrade head

create-secret:
	docker-compose exec api python scripts/create/run.py --name "db_password" --value "supersecret123"

rotate-secrets:
	docker-compose exec api python scripts/rotate/run.py
