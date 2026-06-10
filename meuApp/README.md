# App Financeiro Vue

Aplicativo financeiro feito em Vue + Vite, pronto para conectar ao Firebase depois.

## Como rodar

```bash
npm install
npm run dev
```

## Login de teste

- E-mail: `teste@financeiro.com`
- Senha: `123456`

Também é possível criar uma conta pela tela de cadastro. Nesta versão, os dados ficam no `localStorage`.

## Onde integrar Firebase

Preencha suas credenciais em:

```txt
src/services/firebase.js
```

Depois substitua as funções em:

```txt
src/services/authService.js
src/services/financeService.js
```

As telas já estão usando serviços separados para facilitar a troca do `localStorage` pelo Firestore/Auth.
