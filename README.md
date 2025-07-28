# Projeto Notro

Solução completa com backend e frontend integrados.

## 🛠 Tecnologias

**Backend:**
- Node.js
- Express
- TypeScript

**Frontend:**
- Angular
- TypeScript

**Testes:**
- Jasmine + Karma (Angular)

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### Executar com Docker Compose
```bash
docker-compose up --build
```

Isso irá inicializar:
- **Backend** na porta 3333
- **Frontend** na porta 80

### Acessar a aplicação
- Frontend: http://localhost
- Backend API: http://localhost:3333

## 💡 Por que essas tecnologias?

**Express:** Devido ao tamanho do projeto, o Express vai direto ao ponto sem necessidade de abstrações complexas que podem causar problemas futuros.

**Jasmine:** Framework de testes com bom suporte para Angular e TypeScript.

## ? Obervações

**Otimizações feitas tanto para o backend como para o frontend**
- Não coletar todos os dados da api do gitub, pois seria desnecessário.
- Armazenar no frontend, o cache de Issues e também de Repos, para não ter que ficar fazendo requisções desnecessárias.

## 📁 Estrutura
```
projeto-notro/
├── backend/
├── frontend-with-tests/
├── docker-compose.yml
└── README.md
```

## 🧪 Testes

```bash
cd frontend-with-tests && npm test
```

---

**Autor:** Deyvis
