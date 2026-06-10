const KEY = 'app-financeiro-vue'

const initialData = {
  currentUser: null,
  users: [
    {
      id: '1',
      name: 'Usuário Teste',
      email: 'teste@financeiro.com',
      password: '123456',
      savingGoal: 600,
    },
  ],
  categories: ['Alimentação', 'Transporte', 'Moradia', 'Educação', 'Saúde', 'Lazer', 'Outros'],
  incomes: [
    { id: 'r1', description: 'Salário', amount: 2800, date: new Date().toISOString().slice(0, 10), category: 'Outros' },
    { id: 'r2', description: 'Freelance', amount: 450, date: new Date().toISOString().slice(0, 10), category: 'Outros' },
  ],
  expenses: [
    { id: 'd1', description: 'Mercado', amount: 320, date: new Date().toISOString().slice(0, 10), category: 'Alimentação' },
    { id: 'd2', description: 'Combustível', amount: 180, date: new Date().toISOString().slice(0, 10), category: 'Transporte' },
    { id: 'd3', description: 'Internet', amount: 99.9, date: new Date().toISOString().slice(0, 10), category: 'Moradia' },
  ],
}

export function getData() {
  const saved = localStorage.getItem(KEY)
  if (!saved) {
    localStorage.setItem(KEY, JSON.stringify(initialData))
    return structuredClone(initialData)
  }
  return JSON.parse(saved)
}

export function setData(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
