<template>
  <div>
    <header class="page-header"><div><p class="eyebrow">Visão geral</p><h1>Dashboard</h1></div></header>
    <div class="stats-grid">
      <StatCard label="Saldo atual" :value="money(balance)" :tone="balance >= 0 ? 'positive' : 'negative'" />
      <StatCard label="Total de receitas" :value="money(totalIncome)" tone="positive" />
      <StatCard label="Total de despesas" :value="money(totalExpense)" tone="negative" />
      <StatCard label="Economia do mês" :value="money(monthSavings)" :tone="monthSavings >= 0 ? 'positive' : 'negative'" />
    </div>
    <section class="card chart-card">
      <h2>Gráficos</h2>
      <p v-if="loading">Carregando dados...</p>
      <div v-else style="height: 320px;"><Bar :data="chartData" :options="chartOptions" /></div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { Bar } from "vue-chartjs"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
import StatCard from "../components/StatCard.vue"
import { listIncomes, listExpenses } from "../services/financeService"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const incomes = ref([])
const expenses = ref([])
const loading = ref(false)

const totalIncome = computed(() => incomes.value.reduce((s, i) => s + Number(i.value || i.amount || 0), 0))
const totalExpense = computed(() => expenses.value.reduce((s, i) => s + Number(i.value || i.amount || 0), 0))
const balance = computed(() => totalIncome.value - totalExpense.value)
const currentMonth = new Date().getMonth()

const monthSavings = computed(() => {
  const receitasMes = incomes.value.filter((i) => new Date(i.date).getMonth() === currentMonth).reduce((s, i) => s + Number(i.value || i.amount || 0), 0)
  const despesasMes = expenses.value.filter((i) => new Date(i.date).getMonth() === currentMonth).reduce((s, i) => s + Number(i.value || i.amount || 0), 0)
  return receitasMes - despesasMes
})

const money = (v) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

const chartData = computed(() => ({
  labels: ["Receitas", "Despesas", "Saldo"],
  datasets: [{
    label: "Resumo financeiro",
    data: [Number(totalIncome.value || 0), Number(totalExpense.value || 0), Number(balance.value || 0)],
    backgroundColor: ["#22c55e", "#ef4444", "#3b82f6"]
  }]
}))
const chartOptions = { responsive: true, maintainAspectRatio: false }

onMounted(async () => {
  loading.value = true
  incomes.value = await listIncomes()
  expenses.value = await listExpenses()
  loading.value = false
})
</script>
