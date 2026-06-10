import { getData, setData } from './storage'

export function listFinance() {
  const data = getData()
  return {
    incomes: data.incomes || [],
    expenses: data.expenses || [],
    categories: data.categories || [],
  }
}

export function saveIncome(item) {
  const data = getData()
  if (item.id) data.incomes = data.incomes.map((i) => (i.id === item.id ? item : i))
  else data.incomes.push({ ...item, id: crypto.randomUUID() })
  setData(data)
}

export function deleteIncome(id) {
  const data = getData()
  data.incomes = data.incomes.filter((i) => i.id !== id)
  setData(data)
}

export function saveExpense(item) {
  const data = getData()
  if (item.id) data.expenses = data.expenses.map((i) => (i.id === item.id ? item : i))
  else data.expenses.push({ ...item, id: crypto.randomUUID() })
  setData(data)
}

export function deleteExpense(id) {
  const data = getData()
  data.expenses = data.expenses.filter((i) => i.id !== id)
  setData(data)
}

export function saveCategory(name) {
  const data = getData()
  if (!data.categories.includes(name)) data.categories.push(name)
  setData(data)
}

export function deleteCategory(name) {
  const data = getData()
  data.categories = data.categories.filter((c) => c !== name)
  setData(data)
}
