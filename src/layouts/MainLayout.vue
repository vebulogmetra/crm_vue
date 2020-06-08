<template>
<div>
  <Loader v-if="loading"/>
  <div class="app-main-layout" v-else>

    <Navbar @click="sbOpen = !sbOpen" />

    <Sidebar v-model="sbOpen" />

    <main class="app-content" :class="{full: !sbOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large light-blue darken-3" to="/record">
        <i class="large material-icons">add_circle</i>
      </router-link>
    </div>
  </div>

  </div>
</template>

<script>
import Navbar from '@/components/app_comp/Navbar'
import Sidebar from '@/components/app_comp/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    sbOpen: true,
    //по дефолту включаем лоадер
    loading: true
  }),
  async mounted() {
    //если длина массива инфо о пользователе = 0, то делаем запрос
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    //вырубаем по дефолту включенный лоадер
    this.loading = false
  },

  components: {
    Navbar, Sidebar
  }
}
</script>