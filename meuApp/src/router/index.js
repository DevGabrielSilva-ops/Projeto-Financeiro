import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from '../services/authService'
import Auth from '../views/Auth.vue'
import Layout from '../views/Layout.vue'
import Dashboard from '../views/Dashboard.vue'
import Receitas from '../views/Receitas.vue'
import Despesas from '../views/Despesas.vue'
import Categorias from '../views/Categorias.vue'
import Relatorios from '../views/Relatorios.vue'
import Perfil from '../views/Perfil.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Auth },
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'receitas', component: Receitas },
      { path: 'despesas', component: Despesas },
      { path: 'categorias', component: Categorias },
      { path: 'relatorios', component: Relatorios },
      { path: 'perfil', component: Perfil },
    ],
  },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !getCurrentUser()) return '/login'
  if (to.path === '/login' && getCurrentUser()) return '/dashboard'
})

export default router
