import { defineStore } from "pinia"

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth"

import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "../services/firebase"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false
  }),

  actions: {
    async login(email, senha) {
      this.loading = true
      try {
        const response = await signInWithEmailAndPassword(auth, email, senha)
        this.user = response.user
        return true
      } finally {
        this.loading = false
      }
    },

    async cadastrar(email, senha, nome) {
      this.loading = true
      try {
        const response = await createUserWithEmailAndPassword(auth, email, senha)
        await updateProfile(response.user, { displayName: nome })
        await setDoc(doc(db, "usuarios", response.user.uid), {
          nome,
          email,
          metaMensal: 1000,
          criadoEm: new Date()
        })
        this.user = response.user
        return true
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await signOut(auth)
      this.user = null
    },

    iniciarSessao() {
      onAuthStateChanged(auth, (user) => {
        this.user = user
      })
    }
  }
})
