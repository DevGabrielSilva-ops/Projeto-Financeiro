<template>
  <div class="app-shell">
    <aside class="sidebar">
      <img class="img-logo" src="../../public/Logo.png" alt="">
      <nav>
        <RouterLink to="/dashboard">
        <ion-icon name="grid-outline"></ion-icon>
          Dashboard
        </RouterLink>
        
        <RouterLink to="/receitas">
        <ion-icon name="cash-outline"></ion-icon>
          Receitas
        </RouterLink>
        
        <RouterLink to="/despesas">
        <ion-icon name="wallet-outline"></ion-icon>  
          Despesas
        </RouterLink>
        
        <RouterLink to="/categorias">
        <ion-icon name="pricetags-outline"></ion-icon>  
          Categorias
        </RouterLink>
        
        <RouterLink to="/relatorios">
        <ion-icon name="bar-chart-outline"></ion-icon>  
          Relatórios
        </RouterLink>
        
      </nav>
      
      <div class="log-out">
        <RouterLink to="/perfil"><ion-icon class="perfi" name="person-circle-outline"></ion-icon></RouterLink>
        <button class="logout" @click="signOut"><ion-icon class="logout" name="log-out-outline"></ion-icon></button>
      </div>
    </aside>
    <section class="content"><RouterView /></section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "../services/firebase"

const router = useRouter()
async function signOut() {
  await firebaseSignOut(auth)
  router.push("/login")
}
</script>
