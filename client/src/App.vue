<template>
  <header>
  </header>

  <v-layout v-if="!isLoginOrRegister">
    <v-app-bar class="topBar">
      <v-row justify="center">
        <!-- Spacer-->
        <v-col cols="1"></v-col>
        <!-- Spacer-->
        <v-col cols="2" align="self-cen">
          <v-img src="/logo.png" class="logoImage" contain height="50" alt="Logo"></v-img>
        </v-col>
        <v-col cols="2" align="self-center">
          <v-app-bar-title class="text-h5 titleLogo">MyRifiuti</v-app-bar-title>
        </v-col>
        <v-col cols="2"></v-col>

        <!-- NavBar User-->
        <v-col v-if="!isEnteLogged" cols="4" align="self-center">
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'homepage' }">Homepage</v-btn>
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'groups' }">Gruppi</v-btn>
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'map' }">Mappa</v-btn>
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'reports' }">Segnalazioni</v-btn>
      
          <v-menu open-on-click="">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" class="topButton" variant="elevated" color="buttons" text :to="{ name: '' }">Profilo</v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title v-if="isUserLoggedIn"><v-btn variant="plain" class="optionsProfileMenuButton" :to="{ name: 'profile' }">Impostazioni</v-btn></v-list-item-title>
                <v-list-item-title v-if="isUserLoggedIn"><v-btn variant="plain" class="optionsProfileMenuButton" @click="logout()">Esci</v-btn></v-list-item-title>
                <v-list-item-title v-if="!isUserLoggedIn"><v-btn variant="plain" class="optionsProfileMenuButton" :to="{ name: 'login' }">Login</v-btn></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> 
        </v-col>

        <!-- NavBar Ente-->
        <v-col v-if="isEnteLogged" cols="4" align="self-center">
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'enteHomepage' }">Homepage</v-btn>
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'enteReportList' }">Segnalazioni</v-btn>
          <v-btn class="topButton" variant="elevated" color="buttons" text :to="{ name: 'enteAnalytics' }">Analitiche</v-btn>
          <v-btn class="topButton" variant="elevated" color="buttons" @click="logout()" text>Esci</v-btn>
        </v-col>
      </v-row>

      <!-- Spacer-->
      <v-col cols="1"></v-col>
      <!-- Spacer-->
    </v-app-bar>
  </v-layout>

  <RouterView/>

  <v-layout class="footer">
      <v-footer class="d-flex flex-column" color="footer">
        <span class="text-caption">
          MyRifiuti &nbsp;- &nbsp;Universita di Trento &nbsp;- &nbsp;Manole Emilian, Rigotti Leonardo, Pieropan Lorenzo
        </span>
      </v-footer>
    </v-layout>
</template>

<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

const isLoginOrRegister = computed(() => {
  return route.name === 'login' || route.name === 'register' || route.name === 'enteLogin'
})

const isEnteLogged = computed(() => {
  return route.name === 'enteHomepage' || route.name === 'enteReportList' || route.name === 'enteAnalytics'
})

const isUserLoggedIn = computed(() => store.state.isUserLoggedIn)

const logout = () => {
  store.dispatch('logout').then(() => {
    if (isEnteLogged.value) {
      console.log("Logout ENTE");
      router.push({ name: 'enteLogin' });
    } else {
      console.log("Logout USER");
      router.push({ name: 'login' });
    }
  });
}

</script>

<style scoped>
  .topBar{
    height: 64px;
  }
  .mainBody{
    margin-top: 65px;
  }
  .logoImage{
  
  }
  .titleLogo{
    margin-left: -90px;
    margin-top: 10px;
  }
  .topButton{
    margin-top: 6px;
    margin-right: 10px;
  }
  .footer{
    min-width: 100%;
    position: fixed;
    bottom: 0;
  }





header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
