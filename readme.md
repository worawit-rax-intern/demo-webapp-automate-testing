# Demo Webapp for Automate Testing

## Framework
### Backend
requirements.txt file:
```py
fastapi[standard]==0.115.11
uvicorn==0.34.0
pydantic==2.10.6
sqlmodel==0.0.24
psycopg2==2.9.10
```

### Frontend
* Nextjs 15.3.2 with Typescript
* Tailwindcss 4
* Shadcn/ui

### Database
* PostgreSQL

### Database Management Tools
* pgadmin
* DBeaver

### Environments
* Docker Compose (docker-compose.yaml)

## Installation
1. create .env file in /backend/app/core
2. add DATABASE_URL Variable in .env to connect database

3. run docker compose
```bash
docker-compose up -d --build
```