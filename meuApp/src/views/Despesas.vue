<template>
  <div>
    <header class="page-header"><div><p class="eyebrow">Saídas</p><h1>Despesas</h1></div></header>
    <section class="card"><h2>{{ editing ? 'Editar despesa' : 'Adicionar despesa' }}</h2><TransactionForm :categories="categories" :editing="editing" submit-label="Adicionar despesa" @save="save" @cancel="editing = null" /></section>
    <section class="card"><div class="section-head"><h2>Filtrar por período</h2><div class="filters"><input type="date" v-model="start" /><input type="date" v-model="end" /></div></div><TransactionTable :items="filtered" @edit="editing = { ...$event }" @delete="remove" /></section>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import TransactionForm from '../components/TransactionForm.vue'
import TransactionTable from '../components/TransactionTable.vue'
import { listFinance, saveExpense, deleteExpense } from '../services/financeService'
const data = ref(listFinance())
const editing = ref(null)
const start = ref('')
const end = ref('')
const categories = computed(() => data.value.categories)
const filtered = computed(() => data.value.expenses.filter(i => (!start.value || i.date >= start.value) && (!end.value || i.date <= end.value)))
function refresh(){ data.value = listFinance() }
function save(item){ saveExpense(item); editing.value = null; refresh() }
function remove(id){ if(confirm('Deseja excluir esta despesa?')) { deleteExpense(id); refresh() } }
</script>
