# Laravel Toy Store

Projeto independente do projeto anterior em Python/Flask.

Este projeto implementa uma loja de brinquedos com:

- Backend Laravel (API)
- Banco SQLite
- Frontend estatico consumindo a API
- Containers separados conectados por network Docker

## Estrutura

- backend/: API Laravel + SQLite
- frontend/: Nginx + pagina web consumindo API
- docker-compose.yml: orquestracao dos containers

## Portas

- Frontend: http://localhost:8081
- Backend API: http://localhost:8000

## Subir o projeto

Na pasta laravel_toy_store:

```bash
docker compose up -d --build
```

Verificar containers:

```bash
docker compose ps
```

Parar:

```bash
docker compose down
```

## API

### Publica

- GET /api/toys

### Protegidas com Basic Auth

- POST /api/toys
- DELETE /api/toys/{id}

Credenciais padrao:

- Usuario: admin
- Senha: toy123

Voce pode mudar por variaveis de ambiente no backend:

- TOYSHOP_BASIC_USER
- TOYSHOP_BASIC_PASSWORD

## Testes rapidos

Listar brinquedos:

```bash
curl -i http://localhost:8000/api/toys
```

Criar brinquedo (com Basic Auth):

```bash
curl -i -X POST http://localhost:8000/api/toys \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -u admin:toy123 \
  -d '{"name":"Boneca","description":"Boneca classica","price":59.9,"stock":10}'
```

## Frontend

O frontend usa proxy Nginx para encaminhar /api para o container backend na mesma network Docker.

## Publicacao Docker Hub

Exemplo de tags:

- seuusuario/laravel-toy-store-backend:latest
- seuusuario/laravel-toy-store-frontend:latest

## CI/CD com GitHub Actions

Pipeline em:

- .github/workflows/docker-publish.yml

Esse workflow faz build e push das imagens backend e frontend no Docker Hub em push para a branch main.

Configure os secrets no repositorio GitHub:

- DOCKERHUB_USERNAME
- DOCKERHUB_TOKEN