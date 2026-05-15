# Documentação da API InfraCow

Base URL: `https://infracow-api-hv24.onrender.com`

## Autenticação

A API usa JWT (JSON Web Tokens) para autenticação. A maioria das rotas requer um token no header:

```http
Authorization: Bearer SEU_TOKEN_JWT
```

## Endpoints

### Usuário

#### 1. Criar Usuário (POST)
```bash
curl -X POST https://infracow-api-hv24.onrender.com/usuario \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123",
    "imagem": "url_da_imagem"
  }'
```

**Resposta:** `201 Created`
```json
{
  "message": "Usuário João Silva criado com sucesso!"
}
```

---

#### 2. Fazer Login (POST)
```bash
curl -X POST https://infracow-api-hv24.onrender.com/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "senha123"
  }'
```

**Resposta:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

Salve o token e use em todas as requisições autenticadas.

---

#### 3. Buscar Usuário Logado (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/usuarios \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

---

#### 4. Atualizar Perfil (PUT)
Requer autenticação.

```bash
curl -X PUT https://infracow-api-hv24.onrender.com/perfil \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "email": "novo@email.com",
    "senha": "novaSenha123"
  }'
```

**Resposta:** `200 OK`
```json
{
  "message": "Usuário atualizado com sucesso!"
}
```

---

### Fazendas

#### 1. Listar Fazendas do Usuário (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/fazendas \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "fazendas": [
    {
      "id": 1,
      "nome_fazenda": "Fazenda Modelo",
      "rua": "Rua Principal",
      "bairro": "Zona Rural",
      "cidade": "São Paulo",
      "CEP": "12345-678",
      "numero": "100",
      "id_usuario": 1
    }
  ]
}
```

---

#### 2. Criar Fazenda (POST)
Requer autenticação.

```bash
curl -X POST https://infracow-api-hv24.onrender.com/fazendas \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nome_fazenda": "Fazenda Nova",
    "rua": "Rua das Flores",
    "bairro": "Zona Rural",
    "cidade": "Campinas",
    "CEP": "13000-000",
    "numero": "50",
    "id_usuario": 1
  }'
```

**Resposta:** `201 Created`
```json
{
  "message": "Fazenda Fazenda Nova criada com sucesso",
  "fazenda": {
    "id": 2,
    "nome_fazenda": "Fazenda Nova",
    ...
  }
}
```

---

#### 3. Buscar Fazenda por ID (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/fazendas/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "fazenda": {
    "id": 1,
    "nome_fazenda": "Fazenda Modelo",
    ...
  }
}
```

---

#### 4. Atualizar Fazenda (PUT)
Requer autenticação.

```bash
curl -X PUT https://infracow-api-hv24.onrender.com/fazendas/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nome_fazenda": "Fazenda Atualizada",
    "rua": "Rua Atualizada",
    "bairro": "Novo Bairro",
    "cidade": "Nova Cidade",
    "CEP": "99999-999",
    "numero": "999"
  }'
```

**Resposta:** `200 OK`
```json
{
  "message": "Fazenda Atualizada foi atualizada com sucesso"
}
```

---

#### 5. Deletar Fazenda (DELETE)
Requer autenticação.

```bash
curl -X DELETE https://infracow-api-hv24.onrender.com/fazendas/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `204 No Content`

---

### Animais

#### 1. Listar Todos os Animais (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/animais \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "animais": [
    {
      "id": 1,
      "nome_animal": "Vaca Leiteira",
      "codigo": "VAC001",
      "genero": "Fêmea",
      "tipo": "Bovino",
      "raca": "Holandesa",
      "peso": 450,
      "idade": 3,
      "id_fazenda": 1
    }
  ]
}
```

---

#### 2. Registrar Animal (POST)
Requer autenticação.

```bash
curl -X POST https://infracow-api-hv24.onrender.com/animais \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nome_animal": "Vaca Nova",
    "codigo": "VAC002",
    "genero": "Fêmea",
    "tipo": "Bovino",
    "raca": "Jersey",
    "peso": 400,
    "idade": 2,
    "id_fazenda": 1
  }'
```

**Resposta:** `201 Created`
```json
{
  "messagem": "Animal registrado com sucesso!",
  "animal": {
    "id": 2,
    "nome_animal": "Vaca Nova",
    ...
  }
}
```

---

#### 3. Buscar Animal por ID (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/animais/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "animal": {
    "id": 1,
    "nome_animal": "Vaca Leiteira",
    ...
  }
}
```

---

#### 4. Atualizar Animal (PUT)
Requer autenticação.

```bash
curl -X PUT https://infracow-api-hv24.onrender.com/animais/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "nome_animal": "Vaca Atualizada",
    "genero": "Fêmea",
    "tipo": "Bovino",
    "raca": "Holandesa",
    "peso": 460,
    "idade": 4,
    "codigo": "VAC001"
  }'
```

**Resposta:** `200 OK`
```json
{
  "mensagem": "Vaca Atualizada atualizado com sucesso!"
}
```

---

#### 5. Deletar Animal (DELETE)
Requer autenticação.

```bash
curl -X DELETE https://infracow-api-hv24.onrender.com/animais/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `204 No Content`

---

### Medições

#### 1. Listar Todas as Medições (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/medicao \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "medicoes": [
    {
      "id": 1,
      "temp": 38.5,
      "datahora": "2026-05-15T10:30:00Z",
      "id_animal": 1
    }
  ]
}
```

---

#### 2. Registrar Medição (POST)
Requer autenticação.

```bash
curl -X POST https://infracow-api-hv24.onrender.com/medicao \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "temp": 38.2,
    "datahora": "2026-05-15T11:00:00Z",
    "id_animal": 1
  }'
```

**Resposta:** `201 Created`
```json
{
  "message": "Medição registrada com sucesso",
  "medicao": {
    "id": 2,
    "temp": 38.2,
    ...
  }
}
```

---

#### 3. Buscar Medição por ID (GET)
Requer autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/medicao/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `200 OK`
```json
{
  "medicao": {
    "id": 1,
    "temp": 38.5,
    ...
  }
}
```

---

#### 4. Atualizar Medição (PUT)
Requer autenticação.

```bash
curl -X PUT https://infracow-api-hv24.onrender.com/medicao/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "temp": 38.3,
    "datahora": "2026-05-15T10:45:00Z",
    "id_animal": 1
  }'
```

**Resposta:** `200 OK`
```json
{
  "message": "Medição atualizada com sucesso"
}
```

---

#### 5. Deletar Medição (DELETE)
Requer autenticação.

```bash
curl -X DELETE https://infracow-api-hv24.onrender.com/medicao/1 \
  -H "Authorization: Bearer SEU_TOKEN_JWT"
```

**Resposta:** `204 No Content`

---

## Endpoint de Saúde

Sem autenticação.

```bash
curl -X GET https://infracow-api-hv24.onrender.com/health
```

**Resposta:** `200 OK`
```json
{
  "status": "ok"
}
```

---

## Códigos de Erro

| Código | Significado |
|--------|------------|
| 200 | OK |
| 201 | Criado com sucesso |
| 204 | Sucesso (sem conteúdo) |
| 400 | Requisição inválida / Campos obrigatórios faltando |
| 401 | Não autenticado / Token inválido |
| 403 | Sem permissão |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## Fluxo de Exemplo Completo

1. **Criar usuário:**
   ```bash
   curl -X POST https://infracow-api-hv24.onrender.com/usuario \
     -H "Content-Type: application/json" \
     -d '{"nome":"João","email":"joao@test.com","senha":"123456"}'
   ```

2. **Fazer login e obter token:**
   ```bash
   curl -X POST https://infracow-api-hv24.onrender.com/login \
     -H "Content-Type: application/json" \
     -d '{"email":"joao@test.com","senha":"123456"}'
   ```
   Copie o token retornado.

3. **Criar fazenda:**
   ```bash
   curl -X POST https://infracow-api-hv24.onrender.com/fazendas \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"nome_fazenda":"Fazenda Teste","rua":"Rua 1","bairro":"Bairro","cidade":"São Paulo","CEP":"12345-678","numero":"100","id_usuario":1}'
   ```

4. **Registrar animal:**
   ```bash
   curl -X POST https://infracow-api-hv24.onrender.com/animais \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"nome_animal":"Vaca","codigo":"VAC001","genero":"Fêmea","tipo":"Bovino","raca":"Holandesa","peso":450,"idade":3,"id_fazenda":1}'
   ```

5. **Registrar medição:**
   ```bash
   curl -X POST https://infracow-api-hv24.onrender.com/medicao \
     -H "Authorization: Bearer SEU_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"temp":38.5,"datahora":"2026-05-15T10:30:00Z","id_animal":1}'
   ```

---

## Notas Importantes

- Todos os endpoints, exceto `/health`, `/usuario` e `/login`, requerem autenticação JWT.
- O token JWT expira em 24 horas.
- Validações de campos são obrigatórias.
- Operações DELETE retornam status 204 sem corpo.
