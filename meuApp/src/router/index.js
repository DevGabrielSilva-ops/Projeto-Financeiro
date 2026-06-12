import { createRouter, createWebHistory } from "vue-router"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import Auth from "../views/Auth.vue"
import Layout from "../views/Layout.vue"
import Dashboard from "../views/Dashboard.vue"
import Receitas from "../views/Receitas.vue"
import Despesas from "../views/Despesas.vue"
import Categorias from "../views/Categorias.vue"
import Relatorios from "../views/Relatorios.vue"
import Perfil from "../views/Perfil.vue"

const routes = [
  {
    path: "/login",
    component: Auth
  },
  {
    path: "/",
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        redirect: "/dashboard"
      },
      {
        path: "dashboard",
        component: Dashboard
      },
      {
        path: "receitas",
        component: Receitas
      },
      {
        path: "despesas",
        component: Despesas
      },
      {
        path: "categorias",
        component: Categorias
      },
      {
        path: "relatorios",
        component: Relatorios
      },
      {
        path: "perfil",
        component: Perfil
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        unsubscribe()
        resolve(user)
      }
    )
  })
}

router.beforeEach(async (to) => {
  const user = await getCurrentUser()

  if (to.meta.requiresAuth && !user) {
    return "/login"
  }

  if (to.path === "/login" && user) {
    return "/dashboard"
  }

  return true
})

export default router