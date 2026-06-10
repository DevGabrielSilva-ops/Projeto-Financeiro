<template>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Descrição</th><th>Categoria</th><th>Data</th><th>Valor</th><th>Ações</th></tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.description }}</td>
          <td><span class="badge">{{ item.category }}</span></td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ formatMoney(item.amount) }}</td>
          <td class="actions">
            <button class="small" @click="$emit('edit', item)">Editar</button>
            <button class="small danger" @click="$emit('delete', item.id)">Excluir</button>
          </td>
        </tr>
        <tr v-if="!items.length"><td colspan="5" class="empty">Nenhum lançamento encontrado.</td></tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
defineProps({ items: Array })
defineEmits(['edit', 'delete'])
const formatMoney = (v) => Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const formatDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('pt-BR')
</script>
