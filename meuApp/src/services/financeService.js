import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from "firebase/firestore"

import { auth, db } from "./firebase"

function getUserId() {
  return auth.currentUser?.uid
}

function normalizeValue(value) {
  const raw = value ?? 0

  const formatted = String(raw)
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim()

  return Number(formatted) || 0
}

function formatTransaction(item) {
  return {
    description: item.description ?? item.descricao ?? "",
    value: normalizeValue(item.value ?? item.valor ?? item.amount),
    category: item.category ?? item.categoria ?? "Outros",
    date: item.date ?? item.data ?? new Date().toISOString().slice(0, 10),
    usuarioId: getUserId()
  }
}

export async function listIncomes() {
  const userId = getUserId()
  if (!userId) return []

  const q = query(
    collection(db, "receitas"),
    where("usuarioId", "==", userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs
    .map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export async function saveIncome(item) {
  const userId = getUserId()

  if (!userId) {
    throw new Error("Usuário não autenticado.")
  }

  const data = formatTransaction(item)

  if (item.id) {
    await updateDoc(doc(db, "receitas", item.id), data)
  } else {
    await addDoc(collection(db, "receitas"), data)
  }
}

export async function deleteIncome(id) {
  await deleteDoc(doc(db, "receitas", id))
}

export async function listExpenses() {
  const userId = getUserId()
  if (!userId) return []

  const q = query(
    collection(db, "despesas"),
    where("usuarioId", "==", userId)
  )

  const snapshot = await getDocs(q)

  return snapshot.docs
    .map((documento) => ({
      id: documento.id,
      ...documento.data()
    }))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
}

export async function saveExpense(item) {
  const userId = getUserId()

  if (!userId) {
    throw new Error("Usuário não autenticado.")
  }

  const data = formatTransaction(item)

  if (item.id) {
    await updateDoc(doc(db, "despesas", item.id), data)
  } else {
    await addDoc(collection(db, "despesas"), data)
  }
}

export async function deleteExpense(id) {
  await deleteDoc(doc(db, "despesas", id))
}