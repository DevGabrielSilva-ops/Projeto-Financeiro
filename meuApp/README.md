# 💰 Saldo+

Sistema web para controle financeiro pessoal desenvolvido com Vue.js e Firebase.

O Saldo+ foi criado para ajudar usuários a gerenciar suas finanças de forma simples, intuitiva e eficiente, permitindo o controle de receitas, despesas, categorias personalizadas, metas financeiras e relatórios detalhados.

---

## 🚀 Tecnologias Utilizadas

### Frontend

* Vue 3
* Vue Router
* Composition API
* Vite
* CSS3

### Banco de Dados e Autenticação

* Firebase Authentication
* Cloud Firestore

### Gráficos e Visualização

* Chart.js
* Vue ChartJS

### Ícones

* Ionicons

---

## 📋 Funcionalidades

### 🔐 Autenticação

* Cadastro de usuários
* Login seguro com Firebase Authentication
* Logout
* Proteção de rotas

---

### 📊 Dashboard

* Saldo atual
* Total de receitas
* Total de despesas
* Economia mensal
* Visualização gráfica dos dados financeiros

---

### 💵 Receitas

* Adicionar receita
* Editar receita
* Excluir receita
* Filtrar receitas por período
* Categorizar receitas

---

### 💳 Despesas

* Adicionar despesa
* Editar despesa
* Excluir despesa
* Categorizar despesas
* Controle de gastos

---

### 🏷️ Categorias

* Cadastro de categorias personalizadas
* Exclusão de categorias
* Integração automática com receitas e despesas
* Categorias padrão:

  * Alimentação
  * Transporte
  * Moradia
  * Educação
  * Saúde
  * Lazer
  * Outros

---

### 📈 Relatórios

* Gastos por categoria
* Evolução financeira
* Comparação entre receitas e despesas
* Gráficos interativos

---

### 👤 Perfil

* Dados do usuário
* Nome
* E-mail
* Telefone
* Cidade
* Meta financeira mensal
* Perfil financeiro
* Objetivos financeiros

---

## 📂 Estrutura do Projeto

```text
src/

├── assets
├── components
│   ├── StatCard.vue
│   ├── TransactionForm.vue
│   └── TransactionTable.vue
│
├── services
│   ├── firebase.js
│   ├── financeService.js
│
├── views
│   ├── Dashboard.vue
│   ├── Receitas.vue
│   ├── Despesas.vue
│   ├── Categorias.vue
│   ├── Relatorios.vue
│   ├── Perfil.vue
│   └── Login.vue
│
├── router
│   └── index.js
│
├── App.vue
└── main.js
```

---

## ⚙️ Instalação

### Clone o repositório

```bash
git clone https://github.com/seu-usuario/saldo-plus.git
```

### Entre na pasta

```bash
cd saldo-plus
```

### Instale as dependências

```bash
npm install
```

### Execute o projeto

```bash
npm run dev
```

---

## 🔥 Configuração Firebase

Crie um arquivo:

```text
src/services/firebase.js
```

Configure utilizando suas credenciais:

```javascript
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
```

---

## 🎯 Objetivo do Projeto

O objetivo do Saldo+ é fornecer uma solução moderna para gestão financeira pessoal, permitindo que usuários acompanhem receitas, despesas, metas financeiras e evolução do patrimônio de maneira simples e visual.

---

## 👨‍💻 Desenvolvedor

Gabriel Silva Evaristo

* GitHub: https://github.com/DevGabrielSilva-ops
* LinkedIn: https://www.linkedin.com/in/gabriel-silva-evaristo/

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos e educacionais.
