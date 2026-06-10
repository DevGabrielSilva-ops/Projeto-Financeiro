<template>
  <div class="app-shell">
    <aside class="sidebar">
      <h2>Meu Financeiro</h2>
      <nav>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/receitas">Receitas</RouterLink>
        <RouterLink to="/despesas">Despesas</RouterLink>
        <RouterLink to="/categorias">Categorias</RouterLink>
        <RouterLink to="/relatorios">Relatórios</RouterLink>
        <RouterLink to="/perfil">Perfil</RouterLink>
      </nav>
      <button class="logout" @click="signOut">Sair</button>
    </aside>
    <section class="content"><RouterView /></section>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { logout } from '../services/authService'
const router = useRouter()
function signOut() { logout(); router.push('/login') }
</script>
