<template>
  <main class="auth-page">
    <section class="auth-card">
      <div>
        <p class="eyebrow">Controle financeiro</p>
        <h1>{{ isRegister ? "Criar conta" : "Entrar na conta" }}</h1>
        <p class="muted">Gerencie receitas, despesas, categorias, relatórios e sua meta mensal.</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <input v-if="isRegister" v-model="name" placeholder="Nome completo" required />
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input v-model="password" type="password" placeholder="Senha" required minlength="6" />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="auth.loading">
          {{ auth.loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar" }}
        </button>
      </form>

      <button class="link-button" @click="toggleMode">
        {{ isRegister ? "Já tenho uma conta" : "Criar uma nova conta" }}
      </button>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"

const router = useRouter()
const auth = useAuthStore()
const isRegister = ref(false)
const name = ref("")
const email = ref("")
const password = ref("")
const error = ref("")

function toggleMode() {
  isRegister.value = !isRegister.value
  error.value = ""
}

function traduzirErroFirebase(code) {
  const erros = {
    "auth/invalid-email": "E-mail inválido.",
    "auth/email-already-in-use": "Este e-mail já está cadastrado.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/operation-not-allowed": "Ative Email/Password no Firebase Authentication."
  }
  return erros[code] || `Erro ao autenticar: ${code || "erro desconhecido"}`
}

async function handleSubmit() {
  error.value = ""
  try {
    const sucesso = isRegister.value
      ? await auth.cadastrar(email.value, password.value, name.value)
      : await auth.login(email.value, password.value)
    if (sucesso) router.push("/dashboard")
  } catch (err) {
    error.value = traduzirErroFirebase(err.code)
    console.error(err)
  }
}
</script>
