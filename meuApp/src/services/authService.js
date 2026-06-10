import { getData, setData } from './storage'

export function getCurrentUser() {
  return getData().currentUser
}

export function login(email, password) {
  const data = getData()
  const user = data.users.find((u) => u.email === email && u.password === password)
  if (!user) throw new Error('E-mail ou senha inválidos')
  data.currentUser = { id: user.id, name: user.name, email: user.email, savingGoal: user.savingGoal || 0 }
  setData(data)
  return data.currentUser
}

export function register({ name, email, password }) {
  const data = getData()
  if (data.users.some((u) => u.email === email)) throw new Error('Este e-mail já está cadastrado')
  const user = { id: crypto.randomUUID(), name, email, password, savingGoal: 0 }
  data.users.push(user)
  data.currentUser = { id: user.id, name: user.name, email: user.email, savingGoal: 0 }
  setData(data)
  return data.currentUser
}

export function updateProfile(payload) {
  const data = getData()
  const index = data.users.findIndex((u) => u.id === data.currentUser?.id)
  if (index >= 0) data.users[index] = { ...data.users[index], ...payload }
  data.currentUser = { ...data.currentUser, ...payload }
  setData(data)
  return data.currentUser
}

export function logout() {
  const data = getData()
  data.currentUser = null
  setData(data)
}
