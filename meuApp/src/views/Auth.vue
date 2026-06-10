<template>
  <main class="auth-page">
    <section class="auth-card">
      <div>
        <p class="eyebrow">Controle financeiro</p>
        <h1>{{ isRegister ? 'Criar conta' : 'Entrar na conta' }}</h1>
        <p class="muted">Gerencie receitas, despesas, categorias, relatórios e sua meta mensal.</p>
      </div>
      <form @submit.prevent="handleSubmit">
        <input v-if="isRegister" v-model="name" placeholder="Nome completo" required />
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input v-model="password" type="password" placeholder="Senha" required minlength="6" />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit">{{ isRegister ? 'Cadastrar' : 'Entrar' }}</button>
      </form>
      <button class="link-button" @click="toggleMode">
        {{ isRegister ? 'Já tenho uma conta' : 'Criar uma nova conta' }}
      </button>
      <small class="muted">Teste: teste@financeiro.com / 123456</small>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '../services/authService'

const router = useRouter()
const isRegister = ref(false)
const name = ref('')
const email = ref('teste@financeiro.com')
const password = ref('123456')
const error = ref('')

function toggleMode() { isRegister.value = !isRegister.value; error.value = '' }
function handleSubmit() {
  try {
    if (isRegister.value) register({ name: name.value, email: email.value, password: password.value })
    else login(email.value, password.value)
    router.push('/dashboard')
  } catch (err) { error.value = err.message }
}
</script>
