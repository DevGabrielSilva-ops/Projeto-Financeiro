<template>
  <div>
    <header class="page-header">
      <div>
        <p class="eyebrow">Análises</p>
        <h1>Relatórios</h1>
      </div>
    </header>
    <section class="card">
      <h2>Gastos por categoria</h2>
      <Bar :data="categoryData" :options="options" />
    </section>
    <section class="card">
      <h2>Gastos por mês</h2>
      <Bar :data="monthData" :options="options" />
    </section>
    <section class="card">
      <h2>Evolução financeira</h2>
      <Line :data="evolutionData" :options="options" />
    </section>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js'
import { listFinance } from '../services/financeService'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)
const { expenses, incomes, categories } = listFinance()
const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const sum = (arr) => arr.reduce((s, i) => s + Number(i.amount), 0)
const categoryData = computed(() => ({ labels: categories, datasets: [{ label: 'Gastos por categoria', data: categories.map(c => sum(expenses.filter(e => e.category === c))) }] }))
const monthData = computed(() => ({ labels: months, datasets: [{ label: 'Gastos por mês', data: months.map((_, idx) => sum(expenses.filter(e => new Date(e.date).getMonth() === idx))) }] }))
const evolutionData = computed(() => ({ labels: months, datasets: [{ label: 'Evolução financeira', data: months.map((_, idx) => sum(incomes.filter(i => new Date(i.date).getMonth() === idx)) - sum(expenses.filter(e => new Date(e.date).getMonth() === idx))) }] }))
const options = { responsive: true, maintainAspectRatio: false }
</script>
