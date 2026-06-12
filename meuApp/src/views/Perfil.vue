<template>
  <section class="page">
    <div class="page-header">
      <div>
        <p class="eyebrow">Perfil</p>
        <h1>Meu perfil</h1>
        <p class="muted">
          Gerencie suas informações pessoais e preferências financeiras.
        </p>
      </div>
    </div>

    <section class="profile-summary">
      <div class="profile-avatar">
        <ion-icon name="person-outline"></ion-icon>
      </div>

      <div>
        <h2>{{ form.nome || "Usuário" }}</h2>
        <p>{{ form.email }}</p>
        <span class="profile-badge">
          Conta ativa
        </span>
      </div>
    </section>

    <form class="profile-grid" @submit.prevent="salvarPerfil">
      <section class="card profile-card">
        <h2>Dados pessoais</h2>

        <label>
          Nome completo
          <input
            v-model="form.nome"
            type="text"
            placeholder="Seu nome completo"
            required
          />
        </label>

        <label>
          E-mail
          <input
            v-model="form.email"
            type="email"
            disabled
          />
        </label>

        <label>
          Telefone
          <input
            v-model="form.telefone"
            type="text"
            placeholder="(14) 99999-9999"
          />
        </label>

        <label>
          Cidade
          <input
            v-model="form.cidade"
            type="text"
            placeholder="Sua cidade"
          />
        </label>
      </section>

      <section class="card profile-card">
        <h2>Configurações financeiras</h2>

        <label>
          Meta de economia mensal
          <input
            v-model.number="form.metaMensal"
            type="number"
            min="0"
            placeholder="Ex: 1000"
          />
        </label>

        <label>
          Renda mensal estimada
          <input
            v-model.number="form.rendaMensal"
            type="number"
            min="0"
            placeholder="Ex: 3000"
          />
        </label>

        <label>
          Objetivo financeiro
          <select v-model="form.objetivoFinanceiro">
            <option value="">Selecione um objetivo</option>
            <option value="Economizar dinheiro">Economizar dinheiro</option>
            <option value="Controlar gastos">Controlar gastos</option>
            <option value="Quitar dívidas">Quitar dívidas</option>
            <option value="Investir melhor">Investir melhor</option>
            <option value="Organizar orçamento">Organizar orçamento</option>
          </select>
        </label>

        <label>
          Perfil financeiro
          <select v-model="form.perfilFinanceiro">
            <option value="">Selecione seu perfil</option>
            <option value="Conservador">Conservador</option>
            <option value="Moderado">Moderado</option>
            <option value="Arrojado">Arrojado</option>
          </select>
        </label>
      </section>

      <section class="card profile-card account-card">
        <h2>Dados da conta</h2>

        <div class="info-row">
          <span>ID do usuário</span>
          <strong>{{ userInfo.uid || "Não disponível" }}</strong>
        </div>

        <div class="info-row">
          <span>E-mail verificado</span>
          <strong>{{ userInfo.emailVerified ? "Sim" : "Não" }}</strong>
        </div>

        <div class="info-row">
          <span>Data de criação</span>
          <strong>{{ userInfo.createdAt }}</strong>
        </div>

        <div class="info-row">
          <span>Último login</span>
          <strong>{{ userInfo.lastLogin }}</strong>
        </div>
      </section>

      <section class="cards profile-card actions-card">
        <h2>Ações</h2>

        <button class="btn-save-profile" type="submit">
          <ion-icon name="save-outline"></ion-icon>
          Salvar alterações
        </button>

        <p v-if="mensagem" class="success">
          {{ mensagem }}
        </p>
      </section>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { updateProfile } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

import { auth, db } from "../services/firebase"

const mensagem = ref("")

const form = reactive({
  nome: "",
  email: "",
  telefone: "",
  cidade: "",
  metaMensal: 1000,
  rendaMensal: 0,
  objetivoFinanceiro: "",
  perfilFinanceiro: ""
})

const userInfo = reactive({
  uid: "",
  emailVerified: false,
  createdAt: "",
  lastLogin: ""
})

function formatDate(dateString) {
  if (!dateString) return "Não disponível"

  return new Date(dateString).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  })
}

onMounted(async () => {
  const user = auth.currentUser

  if (!user) return

  form.nome = user.displayName || ""
  form.email = user.email || ""

  userInfo.uid = user.uid
  userInfo.emailVerified = user.emailVerified
  userInfo.createdAt = formatDate(user.metadata.creationTime)
  userInfo.lastLogin = formatDate(user.metadata.lastSignInTime)

  const userRef = doc(db, "usuarios", user.uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    const dados = userSnap.data()

    form.nome = dados.nome || form.nome
    form.email = dados.email || form.email
    form.telefone = dados.telefone || ""
    form.cidade = dados.cidade || ""
    form.metaMensal = dados.metaMensal || 1000
    form.rendaMensal = dados.rendaMensal || 0
    form.objetivoFinanceiro = dados.objetivoFinanceiro || ""
    form.perfilFinanceiro = dados.perfilFinanceiro || ""
  }
})

async function salvarPerfil() {
  const user = auth.currentUser

  if (!user) return

  await updateProfile(user, {
    displayName: form.nome
  })

  await setDoc(
    doc(db, "usuarios", user.uid),
    {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cidade: form.cidade,
      metaMensal: Number(form.metaMensal),
      rendaMensal: Number(form.rendaMensal),
      objetivoFinanceiro: form.objetivoFinanceiro,
      perfilFinanceiro: form.perfilFinanceiro,
      atualizadoEm: new Date()
    },
    { merge: true }
  )

  mensagem.value = "Perfil atualizado com sucesso!"

  setTimeout(() => {
    mensagem.value = ""
  }, 3000)
}
</script>