<template>
  <form class="form-grid" @submit.prevent="submit">
    <input v-model="form.description" required placeholder="Descrição" />
    <input v-model.number="form.value" required min="0.01" step="0.01" type="number" placeholder="Valor" />
    <input v-model="form.date" required type="date" />
    <select v-model="form.category" required>
      <option value="" disabled>Categoria</option>
      <option v-for="category in categories" :key="category">{{ category }}</option>
    </select>
    <button type="submit">{{ form.id ? 'Salvar edição' : submitLabel }}</button>
    <button v-if="form.id" class="secondary" type="button" @click="reset">Cancelar</button>
  </form>
</template>
<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({ categories: Array, editing: Object, submitLabel: String })
const emit = defineEmits(['save', 'cancel'])

const empty = () => ({ id: '', description: '', amount: '', date: new Date().toISOString().slice(0, 10), category: '' })
const form = reactive(empty())

watch(() => props.editing, (item) => {
  Object.assign(form, item || empty())
}, { immediate: true })

function submit() {
  emit('save', { ...form, amount: Number(form.amount) })
  reset()
}
function reset() {
  Object.assign(form, empty())
  emit('cancel')
}
</script>
