<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Visão geral</p>
        <h1>Dashboard</h1>
      </div>
    </header>
    <div class="stats-grid">
      <StatCard label="Saldo atual" :value="money(balance)" :tone="balance >= 0 ? 'positive' : 'negative'" />
      <StatCard label="Total de receitas" :value="money(totalIncome)" tone="positive" />
      <StatCard label="Total de despesas" :value="money(totalExpense)" tone="negative" />
      <StatCard label="Economia do mês" :value="money(monthSavings)"
        :tone="monthSavings >= 0 ? 'positive' : 'negative'" />
    </div>
    <section class="card">
      <h2>Gráficos</h2>
      <Bar :data="chartData" :options="chartOptions" />
    </section>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import StatCard from '../components/StatCard.vue'
import { listFinance } from '../services/financeService'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const { incomes, expenses } = listFinance()
const totalIncome = computed(() => incomes.reduce((s, i) => s + Number(i.amount), 0))
const totalExpense = computed(() => expenses.reduce((s, i) => s + Number(i.amount), 0))
const balance = computed(() => totalIncome.value - totalExpense.value)
const currentMonth = new Date().getMonth()
const monthSavings = computed(() => {
  const r = incomes.filter(i => new Date(i.date).getMonth() === currentMonth).reduce((s, i) => s + Number(i.amount), 0)
  const d = expenses.filter(i => new Date(i.date).getMonth() === currentMonth).reduce((s, i) => s + Number(i.amount), 0)
  return r - d
})
const money = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const chartData = computed(() => ({ labels: ['Receitas', 'Despesas', 'Saldo'], datasets: [{ label: 'Resumo financeiro', data: [totalIncome.value, totalExpense.value, balance.value] }] }))
const chartOptions = { responsive: true, maintainAspectRatio: false }
</script>
