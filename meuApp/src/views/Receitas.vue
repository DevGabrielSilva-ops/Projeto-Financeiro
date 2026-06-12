<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Entradas</p>
        <h1>Receitas</h1>
      </div>
    </header>

    <section class="card">
      <h2>{{ editing ? "Editar receita" : "Adicionar receita" }}</h2>

      <TransactionForm
        :categories="categories"
        :editing="editing || {}"
        submit-label="Salvar receita"
        @save="save"
        @cancel="editing = null"
      />
    </section>

    <section class="card">
      <div class="section-head">
        <h2>Filtrar por período</h2>

        <div class="filters">
          <input type="date" v-model="start" />
          <input type="date" v-model="end" />
        </div>
      </div>

      <p v-if="loading">Carregando receitas...</p>

      <TransactionTable
        v-else
        :items="filtered"
        @edit="editing = { ...$event }"
        @delete="remove"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue"
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore"

import TransactionForm from "../components/TransactionForm.vue"
import TransactionTable from "../components/TransactionTable.vue"

import { auth, db } from "../services/firebase"

import {
  listIncomes,
  saveIncome,
  deleteIncome
} from "../services/financeService"

const receitas = ref([])
const editing = ref(null)
const start = ref("")
const end = ref("")
const loading = ref(false)

const categories = ref([])



function getUserId() {
  return auth.currentUser?.uid
}

async function carregarCategorias() {
  const userId = getUserId()

  if (!userId) {
    categories.value = categoriasPadrao
    return
  }

  const q = query(
    collection(db, "categorias"),
    where("usuarioId", "==", userId)
  )

  const snapshot = await getDocs(q)

  const categoriasFirebase = snapshot.docs.map((documento) => {
    return documento.data().nome
  })

  categories.value =
    categoriasFirebase.length > 0
      ? categoriasFirebase
      : categoriasPadrao
}

const filtered = computed(() => {
  return receitas.value.filter((item) => {
    return (
      (!start.value || item.date >= start.value) &&
      (!end.value || item.date <= end.value)
    )
  })
})

async function refresh() {
  loading.value = true

  receitas.value = await listIncomes()

  loading.value = false
}

async function save(item) {
  await saveIncome(item)

  editing.value = null

  await refresh()
}

async function remove(id) {
  if (confirm("Deseja excluir esta receita?")) {
    await deleteIncome(id)
    await refresh()
  }
}

onMounted(async () => {
  await carregarCategorias()
  await refresh()
})
</script>