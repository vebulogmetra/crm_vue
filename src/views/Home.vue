<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row">

      <HomeBill 
        :rates="curr.rates"
      />

      <HomeCurr
        :rates="curr.rates"
        :date="curr.date"
      />
      
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurr from "@/components/HomeCurr";

export default {
  name: "home",
  data: () => ({
    loading: true,
    //данные по валютам
    curr: null
  }),

  async mounted() {
    //подгружаем валюты и грохаем лоадер
    this.curr = await this.$store.dispatch('fetchCurr')
    this.loading = false
  },

  methods: {
    //обновление по кнопке
    async refresh() {
      this.loading = true
      this.curr = await this.$store.dispatch('fetchCurr')
      this.loading = false
    }

  },

  components: {
    HomeBill,
    HomeCurr
  }
};
</script>
