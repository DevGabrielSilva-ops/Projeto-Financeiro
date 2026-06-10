<template>
  <div>
    <header class="page-header"><div><p class="eyebrow">Conta</p><h1>Perfil</h1></div></header>
    <section class="card profile-card">
      <h2>Dados do usuário</h2>
      <form class="form-grid" @submit.prevent="save">
        <input v-model="form.name" placeholder="Nome do usuário" required />
        <input v-model.number="form.savingGoal" type="number" min="0" step="0.01" placeholder="Meta de economia mensal" />
        <button>Salvar perfil</button>
      </form>
      <p v-if="success" class="success">Perfil atualizado com sucesso.</p>
    </section>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { getCurrentUser, updateProfile } from '../services/authService'
const user = getCurrentUser()
const form = reactive({ name: user?.name || '', savingGoal: user?.savingGoal || 0 })
const success = ref(false)
function save(){ updateProfile({ name: form.name, savingGoal: Number(form.savingGoal) }); success.value = true; setTimeout(() => success.value = false, 2500) }
</script>
