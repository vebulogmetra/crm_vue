<template>
  <div class="app-main-layout">

    <Navbar @click="sbOpen = !sbOpen" />

    <Sidebar v-model="sbOpen" />

    <main class="app-content" :class="{full: !sbOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link lass="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
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
  }),
  components: {
    Navbar, Sidebar
  }
}
</script>