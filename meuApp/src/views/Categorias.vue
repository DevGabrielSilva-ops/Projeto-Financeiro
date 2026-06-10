<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Organização</p>
        <h1>Categorias</h1>
      </div>
    </header>
    <section class="card">
      <h2>Adicionar categoria</h2>
      <form class="inline-form" @submit.prevent="add"><input v-model="name" placeholder="Nome da categoria"
          required /><button>Adicionar</button></form>
    </section>
    <section class="card">
      <h2>Categorias cadastradas</h2>
      <div class="category-grid">
        <div v-for="category in categories" :key="category" class="category-item"><span>{{ category }}</span><button
            class="small danger" @click="remove(category)">Excluir</button></div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { listFinance, saveCategory, deleteCategory } from '../services/financeService'
const categories = ref(listFinance().categories)
const name = ref('')
function refresh() { categories.value = listFinance().categories }
function add() { saveCategory(name.value.trim()); name.value = ''; refresh() }
function remove(category) { if (confirm('Deseja excluir esta categoria?')) { deleteCategory(category); refresh() } }
</script>
