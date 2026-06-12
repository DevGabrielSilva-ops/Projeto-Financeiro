<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Organização</p>
        <h1>Categorias</h1>
      </div>
    </header>

    <section class="card-cat">
      <h2>Adicionar categoria</h2>

      <form @submit.prevent="adicionarCategoria" class="category-form">
        <input
          v-model="novaCategoria"
          placeholder="Nome da categoria"
          required
        />

        <button type="submit" class="btn-add">
          Adicionar
        </button>
      </form>
    </section>

    <section class="card">
      <h2>Categorias cadastradas</h2>

      <p
        v-if="categorias.length === 0"
        class="empty-message"
      >
        <ion-icon name="folder-open-outline"></ion-icon>
        Nenhuma categoria encontrada
      </p>

      <div v-else class="category-list">
        <div
          v-for="categoria in categorias"
          :key="categoria.id"
          class="category-item"
        >
          <div class="category-info">
            <span>{{ categoria.nome }}</span>
          </div>

          <button
            class="btn-delete"
            @click="removerCategoria(categoria.id)"
          >
            <ion-icon name="trash-outline"></ion-icon>
            Excluir
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore"

import { auth, db } from "../services/firebase"

const categorias = ref([])
const novaCategoria = ref("")

function getUserId() {
  return auth.currentUser?.uid
}

async function listarCategorias() {
  const userId = getUserId()

  if (!userId) return

  const q = query(
    collection(db, "categorias"),
    where("usuarioId", "==", userId)
  )

  const snapshot = await getDocs(q)

  categorias.value = snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data()
  }))
}

async function adicionarCategoria() {
  const userId = getUserId()

  if (!userId) return

  const nome = novaCategoria.value.trim()

  if (!nome) return

  await addDoc(collection(db, "categorias"), {
    nome,
    usuarioId: userId,
    criadoEm: new Date()
  })

  novaCategoria.value = ""

  await listarCategorias()
}

async function removerCategoria(id) {
  if (confirm("Deseja excluir esta categoria?")) {
    await deleteDoc(doc(db, "categorias", id))
    await listarCategorias()
  }
}

onMounted(listarCategorias)
</script>