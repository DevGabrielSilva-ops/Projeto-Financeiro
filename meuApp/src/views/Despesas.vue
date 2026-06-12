<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Saídas</p>
        <h1>Despesas</h1>
      </div>
    </header>

    <section class="card">
      <h2>{{ editing ? "Editar despesa" : "Adicionar despesa" }}</h2>

      <TransactionForm
        :categories="categories"
        :editing="editing || {}"
        submit-label="Salvar despesa"
        @save="save"
        @cancel="editing = null"
      />
    </section>

    <section class="card">
      <p v-if="loading">Carregando despesas...</p>

      <TransactionTable
        v-else
        :items="despesas"
        @edit="editing = { ...$event }"
        @delete="remove"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore"

import { auth, db } from "../services/firebase"

import TransactionForm from "../components/TransactionForm.vue"
import TransactionTable from "../components/TransactionTable.vue"

import {
  listExpenses,
  saveExpense,
  deleteExpense
} from "../services/financeService"

const despesas = ref([])
const editing = ref(null)
const loading = ref(false)

const categories = ref([])

const categoriasPadrao = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Educação",
  "Saúde",
  "Lazer",
  "Outros"
]

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

async function refresh() {
  loading.value = true

  despesas.value = await listExpenses()

  loading.value = false
}

async function save(item) {
  await saveExpense(item)

  editing.value = null

  await refresh()
}

async function remove(id) {
  if (confirm("Deseja excluir esta despesa?")) {
    await deleteExpense(id)
    await refresh()
  }
}

onMounted(async () => {
  await carregarCategorias()
  await refresh()
})
</script>