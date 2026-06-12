<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Análises</p>
        <h1>Relatórios</h1>
      </div>
    </header>

    <div class="stats-grid">
      <StatCard
        label="Receitas"
        :value="money(totalIncome)"
        tone="positive"
      />

      <StatCard
        label="Despesas"
        :value="money(totalExpense)"
        tone="negative"
      />

      <StatCard
        label="Saldo"
        :value="money(balance)"
        :tone="balance >= 0 ? 'positive' : 'negative'"
      />
    </div>

    <section class="card">
      <h2>Gastos por categoria</h2>

      <div style="height: 320px;">
        <Bar :data="categoryChartData" :options="chartOptions" />
      </div>
    </section>

    <section class="card">
      <h2>Evolução financeira</h2>

      <div style="height: 320px;">
        <Line :data="monthChartData" :options="chartOptions" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { Bar, Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js"

import StatCard from "../components/StatCard.vue"

import {
  listIncomes,
  listExpenses
} from "../services/financeService"

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
)

const incomes = ref([])
const expenses = ref([])

const totalIncome = computed(() => {
  return incomes.value.reduce((s, i) => s + Number(i.value || 0), 0)
})

const totalExpense = computed(() => {
  return expenses.value.reduce((s, i) => s + Number(i.value || 0), 0)
})

const balance = computed(() => {
  return totalIncome.value - totalExpense.value
})

function money(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}

const categoryChartData = computed(() => {
  const totals = {}

  expenses.value.forEach((item) => {
    const category = item.category || "Outros"
    totals[category] = (totals[category] || 0) + Number(item.value || 0)
  })

  return {
    labels: Object.keys(totals),
    datasets: [
      {
        label: "Gastos por categoria",
        data: Object.values(totals),
        backgroundColor: "#ef4444"
      }
    ]
  }
})

const monthChartData = computed(() => {
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez"
  ]

  const receitasPorMes = Array(12).fill(0)
  const despesasPorMes = Array(12).fill(0)

  incomes.value.forEach((item) => {
    const mes = new Date(item.date).getMonth()
    receitasPorMes[mes] += Number(item.value || 0)
  })

  expenses.value.forEach((item) => {
    const mes = new Date(item.date).getMonth()
    despesasPorMes[mes] += Number(item.value || 0)
  })

  return {
    labels: meses,
    datasets: [
      {
        label: "Receitas",
        data: receitasPorMes,
        borderColor: "#22c55e",
        backgroundColor: "#22c55e"
      },
      {
        label: "Despesas",
        data: despesasPorMes,
        borderColor: "#ef4444",
        backgroundColor: "#ef4444"
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

onMounted(async () => {
  incomes.value = await listIncomes()
  expenses.value = await listExpenses()
})
</script>