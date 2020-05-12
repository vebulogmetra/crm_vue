<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import msgs from '@/utils/msgs'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    //прослушка computed свойства error
    //которое зависит от изменения getters
    //получение при сработке fbError
    error(fbError) {
      this.$pusherror(msgs[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>